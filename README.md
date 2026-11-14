# 算法通识

用 mdBook 整理的机器人算法学习手册，包含工程思维、问题解决和专业算法方向的学习指南。内容仍在编写中。

阅读界面采用暖白与蓝绿配色，支持手机阅读。

- 在线阅读：[lolium3328.github.io/rm-handbook](https://lolium3328.github.io/rm-handbook/)
- 手册目录：[src/SUMMARY.md](src/SUMMARY.md)
- 文档索引：[docs/README.md](docs/README.md)

## 本地预览

先安装 [Rust 工具链](https://www.rust-lang.org/tools/install)，然后在仓库根目录执行：

```sh
cargo install mdbook --version "$(cat .mdbook-version)" --locked
mdbook serve --open
```

默认预览地址为 `http://localhost:3000`，修改 `src/` 中的 Markdown 后会自动刷新。

仅构建静态文件：

```sh
mdbook build
```

构建产物位于 `book/`，已加入 Git 忽略列表。

## 修改与发布

正文放在 `src/`，目录在 `src/SUMMARY.md`。当前只有 00、01、04 三章；04 下的 a/b/c 均标为待完善。新增章节时同时更新目录，保留现有章节编号。

单次工作记录保存在本地 `docs/worklogs/`，该目录已加入 Git 忽略列表，不推送到 GitHub。

推送到 `main` 后，GitHub Actions 自动构建并发布到 GitHub Pages；Pull Request 只运行构建检查。详细说明见[维护与发布指南](docs/guides/maintenance.md)，正文写作约定见[写作指南](docs/guides/writing.md)。
