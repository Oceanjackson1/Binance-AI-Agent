import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { success, error } from "../../utils/formatting.js";

const GITHUB_API = "https://api.github.com";
const DEFAULT_OWNER = "Oceanjackson1";

async function githubFetch(path: string, accept?: string): Promise<unknown> {
  const headers: Record<string, string> = {
    "User-Agent": "BinanceSkillsMCP/1.0",
    Accept: accept ?? "application/vnd.github.v3+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${GITHUB_API}${path}`, { headers });
  if (!response.ok) {
    const data = (await response.json()) as { message?: string };
    throw new Error(
      `GitHub API error ${response.status}: ${data.message ?? response.statusText}`
    );
  }
  return response.json();
}

export function registerGitHubTools(server: McpServer) {
  // 1. 列出用户的所有仓库
  server.tool(
    "github_list_repos",
    "List all public repositories for a GitHub user (default: Oceanjackson1)",
    {
      owner: z
        .string()
        .optional()
        .describe("GitHub username, defaults to Oceanjackson1"),
      sort: z
        .enum(["updated", "created", "pushed", "full_name"])
        .optional()
        .describe("Sort field, defaults to updated"),
      per_page: z
        .number()
        .optional()
        .describe("Results per page, max 100, defaults to 30"),
    },
    async ({ owner, sort, per_page }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const params = new URLSearchParams();
        if (sort) params.set("sort", sort);
        if (per_page) params.set("per_page", String(per_page));
        const query = params.toString();
        const data = await githubFetch(
          `/users/${user}/repos${query ? `?${query}` : ""}`
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. 获取仓库详情
  server.tool(
    "github_get_repo",
    "Get details of a specific GitHub repository",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name, e.g. Binance-AI-Agent"),
    },
    async ({ owner, repo }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const data = await githubFetch(`/repos/${user}/${repo}`);
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. 浏览仓库目录结构
  server.tool(
    "github_list_contents",
    "List files and directories in a repository path",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name"),
      path: z
        .string()
        .optional()
        .describe("Directory path within the repo, defaults to root"),
      ref: z
        .string()
        .optional()
        .describe("Branch or commit SHA, defaults to main"),
    },
    async ({ owner, repo, path, ref }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const filePath = path ?? "";
        const params = ref ? `?ref=${ref}` : "";
        const data = await githubFetch(
          `/repos/${user}/${repo}/contents/${filePath}${params}`
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. 读取文件内容
  server.tool(
    "github_read_file",
    "Read the content of a specific file in a repository",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name"),
      path: z.string().describe("File path, e.g. src/index.ts"),
      ref: z
        .string()
        .optional()
        .describe("Branch or commit SHA, defaults to main"),
    },
    async ({ owner, repo, path, ref }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const params = ref ? `?ref=${ref}` : "";
        const data = (await githubFetch(
          `/repos/${user}/${repo}/contents/${path}${params}`
        )) as { content?: string; encoding?: string; size?: number; name?: string };

        if (data.content && data.encoding === "base64") {
          const decoded = Buffer.from(data.content, "base64").toString("utf-8");
          return success({
            name: data.name,
            path,
            size: data.size,
            content: decoded,
          });
        }
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. 搜索代码
  server.tool(
    "github_search_code",
    "Search for code across repositories. Supports searching within a specific user/repo or globally",
    {
      query: z
        .string()
        .describe("Search query, e.g. 'BinanceClient' or 'import zod'"),
      owner: z
        .string()
        .optional()
        .describe("Limit search to this user's repos, defaults to Oceanjackson1"),
      repo: z
        .string()
        .optional()
        .describe("Limit search to a specific repo name"),
      language: z
        .string()
        .optional()
        .describe("Filter by language, e.g. typescript, python"),
      per_page: z
        .number()
        .optional()
        .describe("Results per page, max 100, defaults to 30"),
    },
    async ({ query, owner, repo, language, per_page }) => {
      try {
        let q = query;
        const user = owner ?? DEFAULT_OWNER;
        if (repo) {
          q += ` repo:${user}/${repo}`;
        } else {
          q += ` user:${user}`;
        }
        if (language) {
          q += ` language:${language}`;
        }
        const params = new URLSearchParams({ q });
        if (per_page) params.set("per_page", String(per_page));
        const data = await githubFetch(
          `/search/code?${params.toString()}`,
          "application/vnd.github.text-match+json"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. 获取仓库完整文件树
  server.tool(
    "github_get_tree",
    "Get the full file tree of a repository (all files and directories recursively)",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name"),
      ref: z
        .string()
        .optional()
        .describe("Branch or commit SHA, defaults to main"),
    },
    async ({ owner, repo, ref }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const branch = ref ?? "main";
        const data = await githubFetch(
          `/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. 获取最近提交记录
  server.tool(
    "github_get_commits",
    "Get recent commit history for a repository",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name"),
      path: z
        .string()
        .optional()
        .describe("Only show commits touching this file path"),
      per_page: z
        .number()
        .optional()
        .describe("Number of commits to return, max 100, defaults to 20"),
    },
    async ({ owner, repo, path, per_page }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const params = new URLSearchParams();
        if (path) params.set("path", path);
        params.set("per_page", String(per_page ?? 20));
        const data = await githubFetch(
          `/repos/${user}/${repo}/commits?${params.toString()}`
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. 查看文件的修改历史（blame 信息）
  server.tool(
    "github_get_file_commits",
    "Get the commit history for a specific file to see who changed what and when",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name"),
      path: z.string().describe("File path to get history for"),
      per_page: z
        .number()
        .optional()
        .describe("Number of commits, defaults to 10"),
    },
    async ({ owner, repo, path, per_page }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const params = new URLSearchParams({
          path,
          per_page: String(per_page ?? 10),
        });
        const data = await githubFetch(
          `/repos/${user}/${repo}/commits?${params.toString()}`
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. 查看仓库使用的编程语言统计
  server.tool(
    "github_get_languages",
    "Get the programming language breakdown for a repository (bytes per language)",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name"),
    },
    async ({ owner, repo }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const data = await githubFetch(`/repos/${user}/${repo}/languages`);
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 10. 对比两个分支/提交之间的代码差异
  server.tool(
    "github_compare",
    "Compare two branches, tags, or commits to see the code diff",
    {
      owner: z
        .string()
        .optional()
        .describe("Repository owner, defaults to Oceanjackson1"),
      repo: z.string().describe("Repository name"),
      base: z.string().describe("Base branch/tag/SHA for comparison"),
      head: z.string().describe("Head branch/tag/SHA for comparison"),
    },
    async ({ owner, repo, base, head }) => {
      try {
        const user = owner ?? DEFAULT_OWNER;
        const data = await githubFetch(
          `/repos/${user}/${repo}/compare/${base}...${head}`
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
