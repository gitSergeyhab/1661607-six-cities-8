import { Comment } from '../types/types';


const getDateStamp = (date: string) => +new Date(date);

const sortReviewsByDate = (review1: Comment, review2: Comment): number => getDateStamp(review2.date) - getDateStamp(review1.date);


export const getDateTime = (date: string): string => (new Date(date)).toISOString().split('T')[0];

export const getReviewDate = (date: string): string => new Date(date).toLocaleString('en-US', {month: 'long', year: 'numeric'});

export const getSortedReviewsByDate = (reviews: Comment[]): Comment[] => [...reviews].sort(sortReviewsByDate);
