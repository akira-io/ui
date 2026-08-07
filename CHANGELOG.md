# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0](https://github.com/akira-io/akira-ui/compare/v1.1.1...v1.2.0) (2026-08-07)

### Bug Fixes

- **ui:** Stop making consumers undo the design language ([b178117](https://github.com/akira-io/akira-ui/commit/b178117343d416381d274a5ae516de6fd9cd38b9))
- **password-input:** Let the locale provider name the reveal control ([1210949](https://github.com/akira-io/akira-ui/commit/1210949b5743bb41c465518338c5eddd29c2f350))

## [1.1.1](https://github.com/akira-io/akira-ui/compare/v1.1.0...v1.1.1) (2026-08-07)

### Bug Fixes

- **field:** Forward the props Field hands its controls ([56913e2](https://github.com/akira-io/akira-ui/commit/56913e2e9f7f29b94992761d3657f03137a241d8))
- **data-table:** Let the search field read its focus as depth ([143c348](https://github.com/akira-io/akira-ui/commit/143c348dbd8b6fdcbfe5e53e91a23d90402d5e19))
- **button:** Let a component composing Button name its own element ([047df7a](https://github.com/akira-io/akira-ui/commit/047df7aa11d0f40bee5134805b50da430f847214))


### Code Refactoring

- **ui:** Give the whole catalog one rule for naming a slot ([4e85c25](https://github.com/akira-io/akira-ui/commit/4e85c25ba8dd58376c9e64dd0c0040ac9e718149))

## [1.1.0](https://github.com/akira-io/akira-ui/compare/v1.0.0...v1.1.0) (2026-08-07)

### Bug Fixes

- **ui:** Preserve Button asChild props (#3) ([b967bf5](https://github.com/akira-io/akira-ui/commit/b967bf578c77c1e9d989163384cee3e0b846be5d))
- **button:** Support loading for slotted controls (#3) ([1ae85bf](https://github.com/akira-io/akira-ui/commit/1ae85bf821715cce8e5c15d332cbed070d876816))
- **button:** Preserve slotted loading footprint (#3) ([90a8d98](https://github.com/akira-io/akira-ui/commit/90a8d987eb8a0b7bf28a9424cd334635f6672db6))
- **button:** Stabilize slotted loading states (#3) ([8dbdba7](https://github.com/akira-io/akira-ui/commit/8dbdba7753d9aeb73553e584f18c0f9e34b8aee9))
- **button:** Preserve controlled caller props ([17ce73b](https://github.com/akira-io/akira-ui/commit/17ce73b78c6665aae1425710200765b01650040c))
- **ci:** Keep docs sync on site next ([f6892f8](https://github.com/akira-io/akira-ui/commit/f6892f84c23b07285100ad378e6f57c64938e91a))
- **language:** Let a recessed surface read as a well, not a second panel ([febe5bf](https://github.com/akira-io/akira-ui/commit/febe5bf34a0e247c7d554313479f9a4471ba3cb1))
- **floating-sheet:** Name the stack after its top panel and hold the stack order ([e49fd1d](https://github.com/akira-io/akira-ui/commit/e49fd1d7bfa3239973e769d2a06e2e5653bbe28b))
- **collapsible:** Let the primitive open and close without painting a card ([c6fa49f](https://github.com/akira-io/akira-ui/commit/c6fa49f4ffa4d89926bdd2ad6bbb2eaa0f9e7c6f))


### Features

- **ui:** Add accessible spinner primitive (#3) ([a1cf359](https://github.com/akira-io/akira-ui/commit/a1cf359f7e34f0008a3773dc6f827537369440fc))
- **ui:** Add Button loading state (#3) ([a4649c2](https://github.com/akira-io/akira-ui/commit/a4649c2b108881016d284ceca167ed54b0f420bc))
- **theme:** Distinguish Nos Ferry destructive actions ([af91c90](https://github.com/akira-io/akira-ui/commit/af91c9077b962ed63a6888b99af61494fe93a7b0))
- **types:** Export the table types the DataTable API already exposes ([c13be88](https://github.com/akira-io/akira-ui/commit/c13be88743f9de965201fe281d9a19b72dbc0955))
- **blocks:** Add the settings family a grouped index and its pages compose from ([7035960](https://github.com/akira-io/akira-ui/commit/7035960384567c035426a55d2810b283526076b4))
- **floating-sheet:** Stack panels like pages of a book ([684f92e](https://github.com/akira-io/akira-ui/commit/684f92e633210e8a3df964c000a50419603dd162))
- **shells:** Let sidebar groups remember whether they are collapsed ([726c7b3](https://github.com/akira-io/akira-ui/commit/726c7b3b9cecce1d42ee8e57996a75d5db587c39))
- **settings:** Autosave a settings form, show its state and pair its fields ([1535aea](https://github.com/akira-io/akira-ui/commit/1535aeaa5a85c9b3f7c0cdb65efd43bdcdae466b))
- **inertia:** Drive table filters from one hook ([8c02d2d](https://github.com/akira-io/akira-ui/commit/8c02d2df868db279b13125dd013c0f08822e73dd))
- **date-picker:** Pick a single day from the shared calendar ([7b1c7d9](https://github.com/akira-io/akira-ui/commit/7b1c7d9ded01f1ec1dbe1e327c8e49faf673f972))
- **copy:** Add a copy button and let InfoField use it ([7187773](https://github.com/akira-io/akira-ui/commit/718777309f55119a856d805e598475dd769dc02b))
- **two-factor:** Add a headless setup and verification family ([65d32b6](https://github.com/akira-io/akira-ui/commit/65d32b681f04380fa51565b4676f565e6229c861))
- **code:** Show code inline, in a block, and as JSON ([33f9bf1](https://github.com/akira-io/akira-ui/commit/33f9bf1fd28edc297275a58a405e559ea4931366))
- **ui:** Add an appearance toggle, a text link and a status badge ([e2af9d1](https://github.com/akira-io/akira-ui/commit/e2af9d1bf577952ff7c1f7b3fea59ba328294567))
- **locales:** Read component labels from a locale provider ([7df364b](https://github.com/akira-io/akira-ui/commit/7df364b766ca2807c8e6a124965f1cffe0d9c48c))
- **blocks:** Put a form in an overlay with a save footer ([7139638](https://github.com/akira-io/akira-ui/commit/71396380894d46d6985992912976c2f2e7a61ac4))
- **field:** Pair a label, description and error with any control ([15bc4e8](https://github.com/akira-io/akira-ui/commit/15bc4e8897e3915970321b7ce75e8f53f816cb3c))
- **shells:** Add an auth shell and a danger zone ([f86215f](https://github.com/akira-io/akira-ui/commit/f86215f9661d205f5084ecf0f43cc9d0cd4fbcbf))
- **empty-state:** Show one design for anything with nothing to show ([f5714d1](https://github.com/akira-io/akira-ui/commit/f5714d118ad50e8748408134dcc7ade5658c252d))
- **editor:** Add a composable rich text editor on Tiptap ([745f8cc](https://github.com/akira-io/akira-ui/commit/745f8ccfa6334bb9f8064db4e0b74a1979104350))

## [1.0.0](https://github.com/akira-io/akira-ui/compare/...v1.0.0) (2026-08-03)

### Bug Fixes

- **inertia:** Record tour progress without a page visit ([7cdfb9d](https://github.com/akira-io/akira-ui/commit/7cdfb9d72dcc8bb9abbfc126be890feca26cdda0))
- **package:** Declare the animate plugin and mark inertia optional ([feb7ca9](https://github.com/akira-io/akira-ui/commit/feb7ca9d723a7f26a75bb84c5e1e98728dd064d9))
- **theme:** Make components read the brand tokens ([e0e1a3c](https://github.com/akira-io/akira-ui/commit/e0e1a3c67c784519a90045f9d23a105ffe364afb))
- **theme:** Stop painting destructive text in the on-destructive color ([ad81c8b](https://github.com/akira-io/akira-ui/commit/ad81c8b7bad4b73b6a96e13e0a9968644d85d8bc))
- **package:** Share recharts with the app and stop shipping Portuguese ([23071c5](https://github.com/akira-io/akira-ui/commit/23071c53af8f8e6d46ae52a9283839b461364c6a))
- **components:** Close the three gaps the demos found ([c20acfe](https://github.com/akira-io/akira-ui/commit/c20acfe02ac779341e61849665cde81c923625b8))
- **components:** Draw the placeholder pattern and put the popover on tokens ([9a90180](https://github.com/akira-io/akira-ui/commit/9a901802fc298f2d9fff0d2a120f865109119a8f))
- **theme:** Make the toaster follow the dark class, not next-themes ([92489c9](https://github.com/akira-io/akira-ui/commit/92489c974fa3941cd4ad1f8bfd225d126e44cd7e))
- **blocks:** Stop painting every stat card icon green ([ec55109](https://github.com/akira-io/akira-ui/commit/ec551091e7002da44fa96520e74f202ad1c07a4a))
- **data-table:** Put the active page on the brand, not near black ([a4e5b60](https://github.com/akira-io/akira-ui/commit/a4e5b607248f21ab725138afedfddb3e8019d4ca))
- **accordion:** Give the accordion its own surface ([d37cb25](https://github.com/akira-io/akira-ui/commit/d37cb25ef601473562fb182f8bbfa9942b36e642))
- **theme:** Make elevated surfaces read as lifted, not outlined ([b191091](https://github.com/akira-io/akira-ui/commit/b191091f9c28b8628e4f9de0c5f8e7f54df2d3cf))
- **theme:** Draw a surface edge once, in glass ([bb85d95](https://github.com/akira-io/akira-ui/commit/bb85d95019d5b0bf0be1631d3a9919e6b756a5ee))
- **theme:** Separate stacked surfaces by tone, not by outline ([2cb46eb](https://github.com/akira-io/akira-ui/commit/2cb46eb78de3fdcf50fb9e439c0ee920f4012369))
- **language:** Flatten the ring when a surface nests inside another ([1dcf130](https://github.com/akira-io/akira-ui/commit/1dcf13008262f9735124aeae9d37fe711409eee2))
- **table:** Drop the corner radius when a table nests in a panel ([8be7d4d](https://github.com/akira-io/akira-ui/commit/8be7d4d1cd20a1dedae2231ff624a08a8d8345f0))
- **data-table:** Show the search icon and the active page size ([5be6a65](https://github.com/akira-io/akira-ui/commit/5be6a65b1ad99f30d70055462d57554784baf2eb))


### Code Refactoring

- **language:** Compose every floating surface from one source ([5382a74](https://github.com/akira-io/akira-ui/commit/5382a74f951d0e9c3303f38a28833c6ea98d04d1))


### Features

- **theme:** Add the akira color ramp ([35ebe31](https://github.com/akira-io/akira-ui/commit/35ebe31cd8e905d799bab172363c87714223248d))
- **theme:** Drive semantic tokens from the akira ramp ([705d93f](https://github.com/akira-io/akira-ui/commit/705d93f04431a95402aba29aea1059f26c964566))
- **theme:** Add data-brand presets with the nosferry palette ([07f0435](https://github.com/akira-io/akira-ui/commit/07f0435042463d32e75e47a36e33181b1bba34db))
- **tour:** Rename the popover class to akira-tour ([8b2de22](https://github.com/akira-io/akira-ui/commit/8b2de2291ee4ecb3fed7de610ac55a9178894fd4))
- **i18n:** Ship the portuguese data table labels as a locale export ([2b3c3f5](https://github.com/akira-io/akira-ui/commit/2b3c3f51275a733b7c7100ea1318a4a42f76c08e))
- **i18n:** Default every user-facing string to english ([1c5aac5](https://github.com/akira-io/akira-ui/commit/1c5aac550165a6c356fe599f334f6c2452075669))
- **theme:** One design language across every component ([abe17a0](https://github.com/akira-io/akira-ui/commit/abe17a0f7ef64fca103eaa581a6197bc344a6625))
- **theme:** Give every container component its own surface ([70bfa49](https://github.com/akira-io/akira-ui/commit/70bfa490b0ca831c2cf1df0267b7564a91e5d3bb))
- **language:** Give controls a glass surface and modals a solid edge ([f477921](https://github.com/akira-io/akira-ui/commit/f477921fb6179d487f90f12d4d245ce815467aea))
- **language:** Unify surface, radius and control colour across the set ([c140692](https://github.com/akira-io/akira-ui/commit/c140692eba6000100a6670551a90cb98a6c8b4ca))
- **package:** Ship the documentation with the package ([d8aea54](https://github.com/akira-io/akira-ui/commit/d8aea54ed035f1557ba8b072cc6db1f166f70eb7))

