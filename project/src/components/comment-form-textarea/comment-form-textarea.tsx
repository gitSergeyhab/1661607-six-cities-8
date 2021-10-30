
import { ChangeEvent, memo } from 'react';


type CommentFormTextareaProps = {isFormBlocked: boolean, review: string, onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void}

function CommentFormTextarea({isFormBlocked, review, onChange} : CommentFormTextareaProps): JSX.Element {
  /* eslint-disable no-console */
  console.log('Textarea');


  return (
    <textarea
      disabled={isFormBlocked}
      value={review}
      onChange={onChange}
      className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
    >
    </textarea>
  );
}

export default memo(CommentFormTextarea);
