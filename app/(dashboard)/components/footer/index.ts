export interface IFooterLink {
  label: string;
  href: string;
  isExternal: boolean;
}

export interface IFooterSection {
  title: string;
  links: IFooterLink[];
}

export interface IFooter {
  _id?: string; // Assuming it comes from a database
  companyName: string;
  companyDescription: string;
  sections: IFooterSection[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  copyrightText: string;
  socialLinks: Record<string, string>;
}
