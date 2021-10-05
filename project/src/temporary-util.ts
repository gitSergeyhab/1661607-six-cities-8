import {AuthorizationStatus} from './constants';

export const checkStatus = (status: string): boolean => status === AuthorizationStatus.Auth;
