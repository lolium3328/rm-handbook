# 维护与发布指南

## 文件组织

| 位置 | 用途 |
| --- | --- |
| `src/` | 在线手册的 Markdown 正文 |
| `src/SUMMARY.md` | 章节目录和顺序 |
| `book.toml` | 中文元数据、主题、仓库链接和 Pages 子路径 |
| `.mdbook-version` | 本地与 CI 使用的 mdBook 版本，目前为 0.5.4 |
| `theme/custom.css` | 中文正文行距、内容宽度和宽表格滚动样式 |
| `.github/workflows/pages.yml` | 构建检查与 GitHub Pages 部署 |
| `docs/guides/` | 长期维护和写作指南 |
| `docs/worklogs/` | 仅保存在本地的任务计划、过程和验证记录，已加入 Git 忽略列表 |
| `book/` | 本地生成的静态站点，不提交 Git |

## 本地构建

安装 Rust 后，在仓库根目录执行：

```sh
cargo install mdbook --version "$(cat .mdbook-version)" --locked
mdbook serve --open
```

`mdbook build` 生成 `book/`，可直接作为静态网站发布。构建配置使用 `create-missing = false`：如果目录引用了不存在的正文，构建会报错，避免误生成空章节。

mdBook 目录使用相对 `src/` 的路径。当前只保留 00、01、04 三章，04 下的 a/b/c 均标为待完善；02、03、05 不属于当前章节结构。新增章节时先建立正文文件，再同步更新目录。

## GitHub Pages

- 仓库：<https://github.com/lolium3328/rm-handbook>
- 在线阅读：<https://lolium3328.github.io/rm-handbook/>
- 默认分支：`main`。
- 仓库可见性：public。
- Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。

首次启用 Pages 后，推送到 `main` 或在 Actions 中手动运行 `Build and deploy mdBook`。构建任务下载固定版本的官方 mdBook 二进制并校验 SHA-256，部署任务使用 GitHub 自带的临时令牌和 `github-pages` 环境，无需添加个人访问令牌。Pull Request 只构建，不部署。

如果变更 GitHub 用户名或仓库名，同步修改 `book.toml` 中的 `site-url`、`git-repository-url`、`edit-url-template`，以及 README 和本指南中的链接。`site-url = "/rm-handbook/"` 保证子路径部署时的 404 页面能正确加载资源。

升级 mdBook 时，同时更新 `.mdbook-version` 和工作流中的 `MDBOOK_SHA256`（对应官方 `x86_64-unknown-linux-musl` 发布包），然后在本地安装新版本并重新构建。

## 日常更新

1. 修改 `src/` 正文；新增、调整章节时同步更新 `src/SUMMARY.md`。
2. 在本地 `docs/worklogs/` 创建使用 Asia/Singapore 时间的任务记录，持续记录计划、改动与验证结果；该目录不提交 Git。新增长期文档时在 `docs/README.md` 登记。
3. 运行 `mdbook build`，检查目录、表格和正文内部链接。
4. 提交 Git commit 并推送到 `main`，确认 Actions 成功和线上页面可访问。

新增或移动维护文档时同步更新文档索引。写作约定见[写作指南](writing.md)。

## 官方参考

- [mdBook 配置](https://rust-lang.github.io/mdBook/format/configuration/general.html)
- [mdBook 目录格式](https://rust-lang.github.io/mdBook/format/summary.html)
- [GitHub 官方 mdBook Pages 工作流](https://github.com/actions/starter-workflows/blob/main/pages/mdbook.yml)
