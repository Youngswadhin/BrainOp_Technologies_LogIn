export type userType = {
  id?: string;
  username: string;
  name: string;
  email?: string;
  password?: string;
  profilePicture?: string;
};

export type postType = {
  id?: string;
  title: string;
  content: string;
  author?: userType;
  comments?: comentType;
};

export type comentType = {
  id?: string;
  content: string;
  author?: userType;
};
