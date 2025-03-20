const tabs = document.querySelectorAll(".c-tab-btn");
const panels = document.querySelectorAll("[role='tabpanel']");

// **初期表示の設定**
tabs.forEach((tab, index) => {
    index === 0 ? tab.setAttribute("aria-selected", "true") : tab.setAttribute("aria-selected", "false");
    tab.setAttribute("tabindex", index === 0 ? "0" : "-1");
});

panels.forEach((panel, index) => {
    index === 0 ? panel.classList.add("is-active") : panel.classList.add("is-hidden");
});

tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        const panelId = e.currentTarget.getAttribute("aria-controls");

        // **すでにアクティブなら何もしない**
        if (e.currentTarget.getAttribute("aria-selected") === "true") return;

        // **すべてのタブとパネルのリセット**
        tabs.forEach((t) => {
            t.setAttribute("aria-selected", "false");
            t.setAttribute("tabindex", "-1");
        });

        panels.forEach((panel) => {
            panel.classList.remove("is-active");
            panel.classList.add("is-hidden");
        });

        // **クリックしたタブをアクティブに**
        e.currentTarget.setAttribute("aria-selected", "true");
        e.currentTarget.setAttribute("tabindex", "0");

        // **対応するパネルを表示**
        const panel = document.getElementById(panelId);
        panel ? (panel.classList.add("is-active"), panel.classList.remove("is-hidden")) : console.error(`パネルが見つかりません: ${panelId}`);
    });
});

// **キーボードナビゲーション（左右矢印キー）**
tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (e) => {
        let newIndex = index;
        if (e.key === "ArrowRight") {
            newIndex = (index + 1) % tabs.length;
        } else if (e.key === "ArrowLeft") {
            newIndex = (index - 1 + tabs.length) % tabs.length;
        }

        tabs[newIndex].focus();
        tabs[newIndex].click();
    });
});