import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type ChangePasswordInputType = {
  token: Scalars['String'],
  password: Scalars['String'],
};

export type FilesType = {
   __typename?: 'FilesType',
  files: Array<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  fileUpload: Scalars['Boolean'],
  changePassword?: Maybe<User>,
  forgotPassword: Scalars['Boolean'],
  invalidateTokens: Scalars['Boolean'],
  register: User,
  login?: Maybe<User>,
  logout: Scalars['Boolean'],
  confirmUser: Scalars['Boolean'],
};


export type MutationFileUploadArgs = {
  file: Scalars['Upload']
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInputType
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  userData: UserInputType
};


export type MutationLoginArgs = {
  loginData: UserLoginInput
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  files: Array<Scalars['String']>,
  test: Scalars['String'],
  me?: Maybe<User>,
  hello?: Maybe<Scalars['String']>,
  getAllUsers: Array<User>,
};


export type UploadType = {
   __typename?: 'UploadType',
  stream: Scalars['Boolean'],
  createReadStream: Scalars['Boolean'],
  filename: Scalars['String'],
  mimetype: Scalars['String'],
  encoding: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  count: Scalars['Float'],
  confirmed: Scalars['Boolean'],
  name: Scalars['String'],
};

export type UserInputType = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstname?: Maybe<Scalars['String']>,
  lastname?: Maybe<Scalars['String']>,
};

export type UserLoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};
export type ChangePasswordMutationVariables = {
  token: Scalars['String'],
  password: Scalars['String']
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type ConfirmMutationVariables = {
  token: Scalars['String']
};


export type ConfirmMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type FileUploadMutationVariables = {
  upload: Scalars['Upload']
};


export type FileUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'fileUpload'>
);

export type ForgotPasswordMutationVariables = {
  email: Scalars['String']
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'firstName' | 'lastName' | 'name' | 'id' | 'confirmed'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  ) }
);

export type FilesQueryVariables = {};


export type FilesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'files'>
);

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'lastName' | 'firstName' | 'confirmed' | 'id' | 'name'>
  )> }
);

export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(data: {token: $token, password: $password}) {
    id
    email
  }
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export type ChangePasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangePasswordMutation, ChangePasswordMutationVariables>, 'mutation'>;

    export const ChangePasswordComponent = (props: ChangePasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> mutation={ChangePasswordDocument} {...props} />
    );
    
export type ChangePasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ChangePasswordMutation, ChangePasswordMutationVariables> & TChildProps;
export function withChangePassword<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  ChangePasswordProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ChangePasswordMutation, ChangePasswordMutationVariables, ChangePasswordProps<TChildProps>>(ChangePasswordDocument, {
      alias: 'changePassword',
      ...operationOptions
    });
};
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmDocument = gql`
    mutation Confirm($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmMutationFn = ApolloReactCommon.MutationFunction<ConfirmMutation, ConfirmMutationVariables>;
export type ConfirmComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ConfirmMutation, ConfirmMutationVariables>, 'mutation'>;

    export const ConfirmComponent = (props: ConfirmComponentProps) => (
      <ApolloReactComponents.Mutation<ConfirmMutation, ConfirmMutationVariables> mutation={ConfirmDocument} {...props} />
    );
    
export type ConfirmProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ConfirmMutation, ConfirmMutationVariables> & TChildProps;
export function withConfirm<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ConfirmMutation,
  ConfirmMutationVariables,
  ConfirmProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ConfirmMutation, ConfirmMutationVariables, ConfirmProps<TChildProps>>(ConfirmDocument, {
      alias: 'confirm',
      ...operationOptions
    });
};
export type ConfirmMutationResult = ApolloReactCommon.MutationResult<ConfirmMutation>;
export type ConfirmMutationOptions = ApolloReactCommon.BaseMutationOptions<ConfirmMutation, ConfirmMutationVariables>;
export const FileUploadDocument = gql`
    mutation FileUpload($upload: Upload!) {
  fileUpload(file: $upload)
}
    `;
export type FileUploadMutationFn = ApolloReactCommon.MutationFunction<FileUploadMutation, FileUploadMutationVariables>;
export type FileUploadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<FileUploadMutation, FileUploadMutationVariables>, 'mutation'>;

    export const FileUploadComponent = (props: FileUploadComponentProps) => (
      <ApolloReactComponents.Mutation<FileUploadMutation, FileUploadMutationVariables> mutation={FileUploadDocument} {...props} />
    );
    
export type FileUploadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<FileUploadMutation, FileUploadMutationVariables> & TChildProps;
export function withFileUpload<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FileUploadMutation,
  FileUploadMutationVariables,
  FileUploadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, FileUploadMutation, FileUploadMutationVariables, FileUploadProps<TChildProps>>(FileUploadDocument, {
      alias: 'fileUpload',
      ...operationOptions
    });
};
export type FileUploadMutationResult = ApolloReactCommon.MutationResult<FileUploadMutation>;
export type FileUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<FileUploadMutation, FileUploadMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export type ForgotPasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>, 'mutation'>;

    export const ForgotPasswordComponent = (props: ForgotPasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> mutation={ForgotPasswordDocument} {...props} />
    );
    
export type ForgotPasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ForgotPasswordMutation, ForgotPasswordMutationVariables> & TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  ForgotPasswordProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ForgotPasswordMutation, ForgotPasswordMutationVariables, ForgotPasswordProps<TChildProps>>(ForgotPasswordDocument, {
      alias: 'forgotPassword',
      ...operationOptions
    });
};
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginData: {email: $email, password: $password}) {
    email
    firstName
    lastName
    name
    id
    confirmed
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    
export type LogoutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LogoutMutation, LogoutMutationVariables> & TChildProps;
export function withLogout<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String, $lastName: String) {
  register(userData: {email: $email, password: $password, firstname: $firstName, lastname: $lastName}) {
    email
    id
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> & TChildProps;
export function withRegister<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FilesDocument = gql`
    query Files {
  files
}
    `;
export type FilesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<FilesQuery, FilesQueryVariables>, 'query'>;

    export const FilesComponent = (props: FilesComponentProps) => (
      <ApolloReactComponents.Query<FilesQuery, FilesQueryVariables> query={FilesDocument} {...props} />
    );
    
export type FilesProps<TChildProps = {}> = ApolloReactHoc.DataProps<FilesQuery, FilesQueryVariables> & TChildProps;
export function withFiles<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FilesQuery,
  FilesQueryVariables,
  FilesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, FilesQuery, FilesQueryVariables, FilesProps<TChildProps>>(FilesDocument, {
      alias: 'files',
      ...operationOptions
    });
};
export type FilesQueryResult = ApolloReactCommon.QueryResult<FilesQuery, FilesQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;
export type HelloComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HelloQuery, HelloQueryVariables>, 'query'>;

    export const HelloComponent = (props: HelloComponentProps) => (
      <ApolloReactComponents.Query<HelloQuery, HelloQueryVariables> query={HelloDocument} {...props} />
    );
    
export type HelloProps<TChildProps = {}> = ApolloReactHoc.DataProps<HelloQuery, HelloQueryVariables> & TChildProps;
export function withHello<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  HelloQuery,
  HelloQueryVariables,
  HelloProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, HelloQuery, HelloQueryVariables, HelloProps<TChildProps>>(HelloDocument, {
      alias: 'hello',
      ...operationOptions
    });
};
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    lastName
    firstName
    confirmed
    id
    name
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;