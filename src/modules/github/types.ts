export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GitHubContent {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink" | "submodule";
  size: number;
  html_url: string;
  download_url: string | null;
  content?: string;
  encoding?: string;
}

export interface GitHubSearchResult {
  total_count: number;
  items: GitHubSearchItem[];
}

export interface GitHubSearchItem {
  name: string;
  path: string;
  html_url: string;
  repository: {
    full_name: string;
  };
  text_matches?: {
    fragment: string;
  }[];
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export interface GitHubTree {
  sha: string;
  tree: {
    path: string;
    type: "blob" | "tree";
    size?: number;
  }[];
}
