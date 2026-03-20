export interface NotionRichText {
  type: "text" | "mention" | "equation";
  text?: {
    content: string;
    link: { url: string } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  paragraph?: {
    rich_text: NotionRichText[];
    color: string;
  };
  heading_1?: {
    rich_text: NotionRichText[];
    color: string;
    is_toggleable: boolean;
  };
  heading_2?: {
    rich_text: NotionRichText[];
    color: string;
    is_toggleable: boolean;
  };
  heading_3?: {
    rich_text: NotionRichText[];
    color: string;
    is_toggleable: boolean;
  };
  image?: {
    type: "file" | "external";
    file?: { url: string; expiry_time: string };
    external?: { url: string };
    caption: NotionRichText[];
  };
  table?: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
  table_row?: {
    cells: NotionRichText[][];
  };
  divider?: Record<string, never>;
  callout?: {
    rich_text: NotionRichText[];
    icon: {
      type: "emoji" | "external" | "file";
      emoji?: string;
      external?: { url: string };
      file?: { url: string };
    };
    color: string;
  };
  column_list?: Record<string, never>;
  column?: Record<string, never>;
  bulleted_list_item?: {
    rich_text: NotionRichText[];
    color: string;
  };
  numbered_list_item?: {
    rich_text: NotionRichText[];
    color: string;
  };
  toggle?: {
    rich_text: NotionRichText[];
    color: string;
  };
  bookmark?: {
    url: string;
    caption: NotionRichText[];
  };
  embed?: {
    url: string;
    caption: NotionRichText[];
  };
  quote?: {
    rich_text: NotionRichText[];
    color: string;
  };
  code?: {
    rich_text: NotionRichText[];
    language: string;
    caption: NotionRichText[];
  };
  video?: {
    type: "file" | "external";
    file?: { url: string; expiry_time: string };
    external?: { url: string };
    caption: NotionRichText[];
  };
  child_page?: {
    title: string;
  };
  child_database?: {
    title: string;
  };
}

export interface ChildPage {
  id: string;
  title: string;
  icon: string | null;
  children?: ChildPage[];
}

export interface NotionPage {
  id: string;
  cover: {
    type: "file" | "external";
    file?: { url: string; expiry_time: string };
    external?: { url: string };
  } | null;
  icon: {
    type: "emoji" | "external" | "file";
    emoji?: string;
    external?: { url: string };
    file?: { url: string };
  } | null;
  properties: {
    title: {
      title: NotionRichText[];
    };
    [key: string]: unknown;
  };
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}
