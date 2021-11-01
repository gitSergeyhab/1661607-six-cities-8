import { ChangeEvent, memo } from 'react';


type CommentFormTextareaProps = {disabled: boolean, value: string, onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void}

function CommentFormTextarea(props : CommentFormTextareaProps): JSX.Element {

  return (
    <textarea
      {...props}
      className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
    >
    </textarea>
  );
}

export default memo(CommentFormTextarea);
