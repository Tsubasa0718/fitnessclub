// 要素の取得
const TrainerCardImages = document.querySelectorAll('.p-trainer__card-image');

TrainerCardImages.forEach((cardImage)=>{
 const textBody = cardImage.nextElementSibling;
    // マウスホバーで表示/非表示
    cardImage.addEventListener("mouseenter", ()=> showProfile(textBody,cardImage))
    cardImage.addEventListener("mouseleave", () => hideProfile(textBody, cardImage));
    // フォーカス時に表示/非表示（キーボード操作対応）
    cardImage.addEventListener("focus", () => showProfile(textBody, cardImage));
    cardImage.addEventListener("blur", () => hideProfile(textBody, cardImage));

    // Enterキーで開閉（キーボード操作対応）
    // Enterキーで開閉（キーボード操作対応）
  cardImage.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      cardImage.getAttribute("aria-expanded") === "true"
        ? hideProfile(textBody, cardImage)
        : showProfile(textBody, cardImage);
    }
  });
})

// 表示関数
const showProfile = (textBody, cardImage) =>{
    textBody.setAttribute("aria-hidden", "false");
    cardImage.setAttribute("aria-expanded", "true");
}

// 非表示関数
const hideProfile = (textBody, cardImage) =>{
    textBody.setAttribute("aria-hidden", "true");
    cardImage.setAttribute("aria-expanded", "false");
}
