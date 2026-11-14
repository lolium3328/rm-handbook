(() => {
    const root = typeof path_to_root === "string" ? path_to_root : "";
    const sidebar = document.querySelector("#mdbook-sidebar");
    document.getElementById("mdbook-theme-toggle")?.remove();
    document.getElementById("mdbook-theme-list")?.remove();

    if (sidebar) {
        const brand = document.createElement("a");
        brand.className = "hb-brand";
        brand.href = `${root}index.html`;
        brand.setAttribute("aria-label", "算法通识首页");
        brand.textContent = "算法通识";
        sidebar.prepend(brand);

        sidebar.querySelectorAll(".chapter-link-wrapper > a").forEach((link) => {
            const match = link.textContent.match(/^(\d{2}(?:-[a-c])?)\s+(.+?)(（待完善）)?$/);
            if (!match) return;
            const number = document.createElement("span");
            number.className = "hb-chapter-number";
            number.textContent = match[1];
            const title = document.createElement("span");
            title.className = "hb-chapter-title";
            title.textContent = match[2];
            link.replaceChildren(number, title);
            if (match[3]) {
                const badge = document.createElement("span");
                badge.className = "hb-draft";
                badge.textContent = "待完善";
                title.append(badge);
            }
        });
    }

    for (const [id, text] of Object.entries({
        "mdbook-sidebar-toggle": "展开或收起目录",
        "mdbook-search-toggle": "搜索文档（/）",
    })) {
        const element = document.getElementById(id);
        if (element) {
            element.title = text;
            element.setAttribute("aria-label", text);
        }
    }

    const searchButton = document.getElementById("mdbook-search-toggle");
    if (searchButton) {
        const label = document.createElement("span");
        label.className = "hb-search-label";
        label.textContent = "搜索文档";
        const shortcut = document.createElement("kbd");
        shortcut.textContent = "/";
        shortcut.setAttribute("aria-hidden", "true");
        searchButton.append(label, shortcut);
    }
    const search = document.getElementById("mdbook-searchbar");
    if (search) search.placeholder = "搜索章节、算法或关键词…";

    const activeTitle = sidebar?.querySelector("a.active .hb-chapter-title");
    const menuTitle = document.querySelector(".menu-title");
    if (activeTitle && menuTitle) menuTitle.textContent = activeTitle.firstChild.textContent;

    document.querySelectorAll(".mobile-nav-chapters").forEach((link) => {
        const label = document.createElement("span");
        label.textContent = link.classList.contains("previous") ? "上一章" : "下一章";
        link.classList.contains("previous") ? link.append(label) : link.prepend(label);
    });
})();
