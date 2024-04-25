import EmojiPicker from "emoji-picker-react";
import React from "react";

const picker = () => {
  return (
    <div>
      <EmojiPicker
        open="true"
        onEmojiClick={(emojiData)=>{console.log(emojiData.emoji)}}
      />
    </div>
  );
};

export default picker;
