# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.5.0](https://github.com/akira-io/ui/compare/v2.4.0...v2.5.0) (2026-09-04)

### Bug Fixes

- **release:** Point generated changelog links at the real repository ([0fd195a](https://github.com/akira-io/ui/commit/0fd195a0350a90dad4dfef5bf5704c0561142131))
- **docs-site:** Correct preview-link regex, editor/code specifiers, and PR clobbering ([cae9eb6](https://github.com/akira-io/ui/commit/cae9eb66e97edba30d5d1807dc08f4b2698a5e7e))
- **docs-site:** Stop code-block from ever getting its own scaffolded folder ([7765b92](https://github.com/akira-io/ui/commit/7765b92bd8b0260dc9d18118a6d83f89eb17c910))
- **progress:** Report the value to assistive technology ([3a18f10](https://github.com/akira-io/ui/commit/3a18f1087c97359dc5c225bf3f81c62ccd56720d))


### Features

- **dropzone:** Take a file without the browser control ([c9ec42f](https://github.com/akira-io/ui/commit/c9ec42f2745811c035acf09f8864e62d00b8f07d))
- **dropzone:** Stop inviting a file the full zone would not take ([8584d91](https://github.com/akira-io/ui/commit/8584d9131231df669cc41a6689800caf2da1b3ea))

## [2.4.0](https://github.com/akira-io/ui/compare/v2.3.0...v2.4.0) (2026-09-02)

### Features

- **data-table:** Add a flat prop for tables inside an elevated surface ([f501058](https://github.com/akira-io/ui/commit/f50105839e4f79170ce4dc648bcbac5000c8c4a0))
- **tabs:** Let a tab panel give up its padding ([fede28c](https://github.com/akira-io/ui/commit/fede28ce195b653648c84aa4dd09342231e9b3ae))

## [2.3.0](https://github.com/akira-io/ui/compare/v2.2.0...v2.3.0) (2026-09-01)

### Bug Fixes

- **combobox:** Make the list scrollable inside a dialog ([68af886](https://github.com/akira-io/ui/commit/68af886b26c8c4fdf8e4a9ecd6907565bad3e4f5))
- **shells:** Match the active nav item by path, not by the whole url ([0d22807](https://github.com/akira-io/ui/commit/0d22807e8e651b1b773e2a49aed699798b2c6c5e))
- **release:** Keep latest on the highest published major ([5f5e59a](https://github.com/akira-io/ui/commit/5f5e59a51719d3fc93b9051beab1a623527f773c))
- **inertia:** Check the login Form binding against the peer's own types ([ed86606](https://github.com/akira-io/ui/commit/ed866060fee07d2066b1483acb484eb7d0fe9af2))
- **tests:** Follow bare, dynamic and parent-relative imports in the dist graph ([ca4f6d4](https://github.com/akira-io/ui/commit/ca4f6d4ce645d7fab81b72640195c546badcdede))


### Code Refactoring

- **shells:** Keep the path rule in one place ([2b1ed50](https://github.com/akira-io/ui/commit/2b1ed507a355da9e0328a4e109d92fe94d9c4edf))
- **blocks:** Replace the login-form wildcard with an explicit export list ([ee5c158](https://github.com/akira-io/ui/commit/ee5c158727d483a6df903eaeb8ca1e6c9323c166))


### Features

- **login-form:** Export fieldError for consumers writing custom parts ([a76290b](https://github.com/akira-io/ui/commit/a76290bd306b92b40751517fedc76b84c38d91ec))

## [2.2.0](https://github.com/akira-io/ui/compare/v2.1.0...v2.2.0) (2026-08-28)

### Bug Fixes

- **floating-sheet:** Let the page show through the scrim ([7cbed86](https://github.com/akira-io/ui/commit/7cbed864de1b14352852af60c4d18ec0f1dab9a7))
- **floating-sheet:** Open overlays inside the sheet panel ([a71c0c5](https://github.com/akira-io/ui/commit/a71c0c57da035c1a297b41af31258a2dfe83f211))
- **floating-sheet:** Portal the remaining overlays into the sheet panel ([d25d60a](https://github.com/akira-io/ui/commit/d25d60a2fef4b9075d570e3847688874d4556536))


### Features

- **data-table:** Let a row action decide whether it applies ([67b3f14](https://github.com/akira-io/ui/commit/67b3f147759b6d03283f7dd21999872eafc35b0c))
- **blocks:** Accept a node as a field label ([e2a59d7](https://github.com/akira-io/ui/commit/e2a59d78b5bf169634dec51ca18a4382d2c35891))

## [2.1.0](https://github.com/akira-io/ui/compare/v2.0.0...v2.1.0) (2026-08-09)

### Bug Fixes

- **floating-sheet:** Draw the scroll shadows with the elevated surface tokens ([46c0fbc](https://github.com/akira-io/ui/commit/46c0fbc9db8ee7cc095bebde85bef654aae52018))


### Features

- **floating-sheet:** Add scroll-driven header and footer shadows ([ee3b246](https://github.com/akira-io/ui/commit/ee3b246d5b266768a2c1258429df77b639055dbf))
- **locales:** Add French locale to @akira-io/ui ([56e4dbe](https://github.com/akira-io/ui/commit/56e4dbe074f2dbf9d9a43355d29ed507a370bd8f))

## [2.0.0](https://github.com/akira-io/ui/compare/v1.3.1...v2.0.0) (2026-08-09)

### Breaking Changes

- **inertia:** Narrow the peer range to the Inertia version that exports Form ([f5af2ee](https://github.com/akira-io/ui/commit/f5af2ee10e6d7d9cbf2dc4723a39a8d7c2344e39))
- **inertia:** Raise the peer floor to the first version with resetOnSuccess ([0847fca](https://github.com/akira-io/ui/commit/0847fca0bbb0343bcfecf0bf67354ee63236932f))
- **login-form:** Scope the public export surface ([5646057](https://github.com/akira-io/ui/commit/5646057bf646509285666683774d4519db8e3caf))


### Bug Fixes

- **shells:** Accept slotName on AuthShell parts ([a72e203](https://github.com/akira-io/ui/commit/a72e203fe5d913569d527cdbb7104219b72b098c))
- **build:** Make the Inertia peer optional so Next and Astro apps skip it ([a4deb1d](https://github.com/akira-io/ui/commit/a4deb1d5ab83ffc415a4c6a5db6e43f1f66a95fb))
- **build:** Cover code/editor entries with client directive, drop metafile, self-heal missing dist in tests ([acf0308](https://github.com/akira-io/ui/commit/acf0308a62934630b3e4285da6d1797a3c19cc62))
- **build:** Always rebuild before verifying the client directive ([7a94ba6](https://github.com/akira-io/ui/commit/7a94ba6d526bf27d767d3015e1a7a9b68b648016))
- **login-form:** Skip blank messages when resolving fieldError ([0e9e5fe](https://github.com/akira-io/ui/commit/0e9e5fe96b49190875107f62572322f2f2c7b958))
- **blocks:** Associate login form errors with their fields, mark submit busy ([0690c59](https://github.com/akira-io/ui/commit/0690c5957a04be317e01e388a4450a5bec2aa4ed))
- **blocks:** Render a resting submit button flat, cover password field aria wiring ([46dd172](https://github.com/akira-io/ui/commit/46dd172045106426179d4067392d58dad97c48b6))
- **login-form:** Let the forgot-password link wrap instead of splitting words ([c040f72](https://github.com/akira-io/ui/commit/c040f72c9e85dfff87538a11f1086523b2e0f290))
- **login-form:** Place the forgot-password link under the input ([a11e0d2](https://github.com/akira-io/ui/commit/a11e0d2f1f377a10fe7b3da43a37ce24a9c2e4e1))
- **login-form:** Resolve part labels through the locale provider without a Root ([9393dda](https://github.com/akira-io/ui/commit/9393ddad7620323bc31bbedb50ecc304c25d5ce5))
- **login-form:** Treat a nullish array entry as no error in fieldError ([3b60c64](https://github.com/akira-io/ui/commit/3b60c6498c8e5febc030e2e6233b3504867ddfc8))
- **login-form:** Let a consumer relax autoFocus and required on the email field ([dbfe174](https://github.com/akira-io/ui/commit/dbfe174d2edc27892b651d80117924d65fdd847e))
- **login-form:** Stop the submit button announcing its pending label twice ([bd2c1cd](https://github.com/akira-io/ui/commit/bd2c1cd805234801bb6e8634ee85c3841cd6638e))
- **login-form:** Give LoginFormPassword the autoFocus/required parity LoginFormEmail got ([1fd2df0](https://github.com/akira-io/ui/commit/1fd2df01980b4d336ea4794a42dd875925b54d32))
- **login-form:** Accept slotName on LoginFormPreset ([c5cdda4](https://github.com/akira-io/ui/commit/c5cdda4f72857e8f26942f15297c46afb16cd7be))
- **login-form:** Stop hardcoding a positive tab order in LoginFormPreset ([70074a6](https://github.com/akira-io/ui/commit/70074a6e436cb4daf1438f26d962e605f2c74b94))
- **login-form:** Fix idle submit markup, mark required fields, guard autoComplete ([a15d6ed](https://github.com/akira-io/ui/commit/a15d6edb9742e51f0da2db1690a226bc13a65aed))
- **inertia:** Compile against Inertia 2.x and forward InertiaLoginForm's slot ([742a0d2](https://github.com/akira-io/ui/commit/742a0d2d6dde8baabfd47e21e39373c2d2e6d7a6))
- **shells:** Let AuthShellPanel take an explicit arrangement, guard AuthShell's slot ([abc7dff](https://github.com/akira-io/ui/commit/abc7dffef37f96ae91f273e3379a8f33d8805640))
- **release:** Gate release tags on the version git-cliff computes ([aeb4384](https://github.com/akira-io/ui/commit/aeb438465d7fb7100a7847c621a818d5f9aa7dea))


### Features

- **shells:** Split AuthShell into composable parts ([5085953](https://github.com/akira-io/ui/commit/5085953a17b0f2d4296792ecad8b5cd8a498766c))
- **build:** Preserve the client directive so Next server components can consume the library ([5f85a01](https://github.com/akira-io/ui/commit/5f85a0116f884b467bbcd70b72d74d827ffce9b8))
- **blocks:** Add the login form labels and context ([f2b88bf](https://github.com/akira-io/ui/commit/f2b88bf28fbc4d59515dbc862e313204fe865fc1))
- **blocks:** Add the composable login form parts ([ddf2f9b](https://github.com/akira-io/ui/commit/ddf2f9b61754fb584120e3e84a941f63b614b547))
- **blocks:** Add the login form preset composed from the parts ([1507a44](https://github.com/akira-io/ui/commit/1507a44b0bf5327daceb75673b70aaf151249f39))
- **inertia:** Bind the login form to the Inertia form ([17a55e6](https://github.com/akira-io/ui/commit/17a55e6903dcf259cbecdf29ae75c6ab67b7c835))
- **akira-mark:** Ship the brand mark and use it in the auth shell docs ([dbff2d0](https://github.com/akira-io/ui/commit/dbff2d0092856ea48e5ce5fac98c25bf9356b04a))
- **login-form:** Resolve labels through the shared locale mechanism ([2d9d1c1](https://github.com/akira-io/ui/commit/2d9d1c1632f03f632511789f2f7be76ac5e04303))

## [1.3.1](https://github.com/akira-io/ui/compare/v1.3.0...v1.3.1) (2026-08-08)

### Bug Fixes

- **data-table:** Space the faceted filter evenly (#80) ([99c8536](https://github.com/akira-io/ui/commit/99c8536983b7e5231a896ec1febb31e90d19af21))
- **theme:** Bring the nosferry dark red back to the brand (#82) ([f57b068](https://github.com/akira-io/ui/commit/f57b068124a06bc2896c1f61809431accfb096cd))
- **button:** Match the icon gap to the padding ([5b3fda8](https://github.com/akira-io/ui/commit/5b3fda87a1aae23481f568d8a24bdd135ab963a8))
- **button:** Tell a leading icon from a trailing one ([7ec6a6a](https://github.com/akira-io/ui/commit/7ec6a6afd14b2f9139ff3f7cfa2d158748498ff3))
- **tabs:** Stop the active tab reading as a hole in dark mode ([b02fe9b](https://github.com/akira-io/ui/commit/b02fe9bf0d3f0f0eee6b904f097378b7a1936c47))
- **language:** Start field text at 16px so iOS Safari stops zooming ([0fb0209](https://github.com/akira-io/ui/commit/0fb0209f82fd943fbf06a5fd8cf732ee8e5a85e5))

## [1.3.0](https://github.com/akira-io/ui/compare/v1.2.0...v1.3.0) (2026-08-07)

### Bug Fixes

- **card:** Make the card opaque and add an outlined variant (#74) ([6bbe7ae](https://github.com/akira-io/ui/commit/6bbe7ae9ca42e8ac2dcc9af24f4ae0b4525b4cfa))
- **theme:** Give light mode a surface hierarchy (#75) ([93519b3](https://github.com/akira-io/ui/commit/93519b3c0cd3ef5306425c381acea3ad0f47d996))
- **nav-user:** Give the user row a resting fill and a softer hover (#76) ([eb8abe8](https://github.com/akira-io/ui/commit/eb8abe81ab0b31d6e6fcdcdfbb52677f1662c278))
- **date-filter:** Put the filter rows back in the menu language (#77) ([a940b07](https://github.com/akira-io/ui/commit/a940b0702a92c6e201be854ea4fc1f6f9a3b5dc0))
- **overlays:** Make the sheet and the sidebar behave on a phone (#78) ([25773c0](https://github.com/akira-io/ui/commit/25773c06b8643d752521e1201c50204cd5384248))

## [1.2.0](https://github.com/akira-io/ui/compare/v1.1.1...v1.2.0) (2026-08-07)

### Breaking Changes

- **ui:** Stop making consumers undo the design language ([b178117](https://github.com/akira-io/ui/commit/b178117343d416381d274a5ae516de6fd9cd38b9))


### Bug Fixes

- **password-input:** Let the locale provider name the reveal control ([1210949](https://github.com/akira-io/ui/commit/1210949b5743bb41c465518338c5eddd29c2f350))

## [1.1.1](https://github.com/akira-io/ui/compare/v1.1.0...v1.1.1) (2026-08-07)

### Breaking Changes

- **button:** Let a component composing Button name its own element ([047df7a](https://github.com/akira-io/ui/commit/047df7aa11d0f40bee5134805b50da430f847214))


### Bug Fixes

- **field:** Forward the props Field hands its controls ([56913e2](https://github.com/akira-io/ui/commit/56913e2e9f7f29b94992761d3657f03137a241d8))
- **data-table:** Let the search field read its focus as depth ([143c348](https://github.com/akira-io/ui/commit/143c348dbd8b6fdcbfe5e53e91a23d90402d5e19))


### Code Refactoring

- **ui:** Give the whole catalog one rule for naming a slot ([4e85c25](https://github.com/akira-io/ui/commit/4e85c25ba8dd58376c9e64dd0c0040ac9e718149))

## [1.1.0](https://github.com/akira-io/ui/compare/v1.0.0...v1.1.0) (2026-08-07)

### Bug Fixes

- **ui:** Preserve Button asChild props (#3) ([b967bf5](https://github.com/akira-io/ui/commit/b967bf578c77c1e9d989163384cee3e0b846be5d))
- **button:** Support loading for slotted controls (#3) ([1ae85bf](https://github.com/akira-io/ui/commit/1ae85bf821715cce8e5c15d332cbed070d876816))
- **button:** Preserve slotted loading footprint (#3) ([90a8d98](https://github.com/akira-io/ui/commit/90a8d987eb8a0b7bf28a9424cd334635f6672db6))
- **button:** Stabilize slotted loading states (#3) ([8dbdba7](https://github.com/akira-io/ui/commit/8dbdba7753d9aeb73553e584f18c0f9e34b8aee9))
- **button:** Preserve controlled caller props ([17ce73b](https://github.com/akira-io/ui/commit/17ce73b78c6665aae1425710200765b01650040c))
- **ci:** Keep docs sync on site next ([f6892f8](https://github.com/akira-io/ui/commit/f6892f84c23b07285100ad378e6f57c64938e91a))
- **language:** Let a recessed surface read as a well, not a second panel ([febe5bf](https://github.com/akira-io/ui/commit/febe5bf34a0e247c7d554313479f9a4471ba3cb1))
- **floating-sheet:** Name the stack after its top panel and hold the stack order ([e49fd1d](https://github.com/akira-io/ui/commit/e49fd1d7bfa3239973e769d2a06e2e5653bbe28b))
- **collapsible:** Let the primitive open and close without painting a card ([c6fa49f](https://github.com/akira-io/ui/commit/c6fa49f4ffa4d89926bdd2ad6bbb2eaa0f9e7c6f))


### Features

- **ui:** Add accessible spinner primitive (#3) ([a1cf359](https://github.com/akira-io/ui/commit/a1cf359f7e34f0008a3773dc6f827537369440fc))
- **ui:** Add Button loading state (#3) ([a4649c2](https://github.com/akira-io/ui/commit/a4649c2b108881016d284ceca167ed54b0f420bc))
- **theme:** Distinguish Nos Ferry destructive actions ([af91c90](https://github.com/akira-io/ui/commit/af91c9077b962ed63a6888b99af61494fe93a7b0))
- **types:** Export the table types the DataTable API already exposes ([c13be88](https://github.com/akira-io/ui/commit/c13be88743f9de965201fe281d9a19b72dbc0955))
- **blocks:** Add the settings family a grouped index and its pages compose from ([7035960](https://github.com/akira-io/ui/commit/7035960384567c035426a55d2810b283526076b4))
- **floating-sheet:** Stack panels like pages of a book ([684f92e](https://github.com/akira-io/ui/commit/684f92e633210e8a3df964c000a50419603dd162))
- **shells:** Let sidebar groups remember whether they are collapsed ([726c7b3](https://github.com/akira-io/ui/commit/726c7b3b9cecce1d42ee8e57996a75d5db587c39))
- **settings:** Autosave a settings form, show its state and pair its fields ([1535aea](https://github.com/akira-io/ui/commit/1535aeaa5a85c9b3f7c0cdb65efd43bdcdae466b))
- **inertia:** Drive table filters from one hook ([8c02d2d](https://github.com/akira-io/ui/commit/8c02d2df868db279b13125dd013c0f08822e73dd))
- **date-picker:** Pick a single day from the shared calendar ([7b1c7d9](https://github.com/akira-io/ui/commit/7b1c7d9ded01f1ec1dbe1e327c8e49faf673f972))
- **copy:** Add a copy button and let InfoField use it ([7187773](https://github.com/akira-io/ui/commit/718777309f55119a856d805e598475dd769dc02b))
- **two-factor:** Add a headless setup and verification family ([65d32b6](https://github.com/akira-io/ui/commit/65d32b681f04380fa51565b4676f565e6229c861))
- **code:** Show code inline, in a block, and as JSON ([33f9bf1](https://github.com/akira-io/ui/commit/33f9bf1fd28edc297275a58a405e559ea4931366))
- **ui:** Add an appearance toggle, a text link and a status badge ([e2af9d1](https://github.com/akira-io/ui/commit/e2af9d1bf577952ff7c1f7b3fea59ba328294567))
- **locales:** Read component labels from a locale provider ([7df364b](https://github.com/akira-io/ui/commit/7df364b766ca2807c8e6a124965f1cffe0d9c48c))
- **blocks:** Put a form in an overlay with a save footer ([7139638](https://github.com/akira-io/ui/commit/71396380894d46d6985992912976c2f2e7a61ac4))
- **field:** Pair a label, description and error with any control ([15bc4e8](https://github.com/akira-io/ui/commit/15bc4e8897e3915970321b7ce75e8f53f816cb3c))
- **shells:** Add an auth shell and a danger zone ([f86215f](https://github.com/akira-io/ui/commit/f86215f9661d205f5084ecf0f43cc9d0cd4fbcbf))
- **empty-state:** Show one design for anything with nothing to show ([f5714d1](https://github.com/akira-io/ui/commit/f5714d118ad50e8748408134dcc7ade5658c252d))
- **editor:** Add a composable rich text editor on Tiptap ([745f8cc](https://github.com/akira-io/ui/commit/745f8ccfa6334bb9f8064db4e0b74a1979104350))

## [1.0.0](https://github.com/akira-io/ui/compare/...v1.0.0) (2026-08-03)

### Breaking Changes

- **tour:** Rename the popover class to akira-tour ([8b2de22](https://github.com/akira-io/ui/commit/8b2de2291ee4ecb3fed7de610ac55a9178894fd4))
- **package:** Share recharts with the app and stop shipping Portuguese ([23071c5](https://github.com/akira-io/ui/commit/23071c53af8f8e6d46ae52a9283839b461364c6a))
- **i18n:** Default every user-facing string to english ([1c5aac5](https://github.com/akira-io/ui/commit/1c5aac550165a6c356fe599f334f6c2452075669))
- **theme:** One design language across every component ([abe17a0](https://github.com/akira-io/ui/commit/abe17a0f7ef64fca103eaa581a6197bc344a6625))


### Bug Fixes

- **inertia:** Record tour progress without a page visit ([7cdfb9d](https://github.com/akira-io/ui/commit/7cdfb9d72dcc8bb9abbfc126be890feca26cdda0))
- **package:** Declare the animate plugin and mark inertia optional ([feb7ca9](https://github.com/akira-io/ui/commit/feb7ca9d723a7f26a75bb84c5e1e98728dd064d9))
- **theme:** Make components read the brand tokens ([e0e1a3c](https://github.com/akira-io/ui/commit/e0e1a3c67c784519a90045f9d23a105ffe364afb))
- **theme:** Stop painting destructive text in the on-destructive color ([ad81c8b](https://github.com/akira-io/ui/commit/ad81c8b7bad4b73b6a96e13e0a9968644d85d8bc))
- **components:** Close the three gaps the demos found ([c20acfe](https://github.com/akira-io/ui/commit/c20acfe02ac779341e61849665cde81c923625b8))
- **components:** Draw the placeholder pattern and put the popover on tokens ([9a90180](https://github.com/akira-io/ui/commit/9a901802fc298f2d9fff0d2a120f865109119a8f))
- **theme:** Make the toaster follow the dark class, not next-themes ([92489c9](https://github.com/akira-io/ui/commit/92489c974fa3941cd4ad1f8bfd225d126e44cd7e))
- **blocks:** Stop painting every stat card icon green ([ec55109](https://github.com/akira-io/ui/commit/ec551091e7002da44fa96520e74f202ad1c07a4a))
- **data-table:** Put the active page on the brand, not near black ([a4e5b60](https://github.com/akira-io/ui/commit/a4e5b607248f21ab725138afedfddb3e8019d4ca))
- **accordion:** Give the accordion its own surface ([d37cb25](https://github.com/akira-io/ui/commit/d37cb25ef601473562fb182f8bbfa9942b36e642))
- **theme:** Make elevated surfaces read as lifted, not outlined ([b191091](https://github.com/akira-io/ui/commit/b191091f9c28b8628e4f9de0c5f8e7f54df2d3cf))
- **theme:** Draw a surface edge once, in glass ([bb85d95](https://github.com/akira-io/ui/commit/bb85d95019d5b0bf0be1631d3a9919e6b756a5ee))
- **theme:** Separate stacked surfaces by tone, not by outline ([2cb46eb](https://github.com/akira-io/ui/commit/2cb46eb78de3fdcf50fb9e439c0ee920f4012369))
- **language:** Flatten the ring when a surface nests inside another ([1dcf130](https://github.com/akira-io/ui/commit/1dcf13008262f9735124aeae9d37fe711409eee2))
- **table:** Drop the corner radius when a table nests in a panel ([8be7d4d](https://github.com/akira-io/ui/commit/8be7d4d1cd20a1dedae2231ff624a08a8d8345f0))
- **data-table:** Show the search icon and the active page size ([5be6a65](https://github.com/akira-io/ui/commit/5be6a65b1ad99f30d70055462d57554784baf2eb))


### Code Refactoring

- **language:** Compose every floating surface from one source ([5382a74](https://github.com/akira-io/ui/commit/5382a74f951d0e9c3303f38a28833c6ea98d04d1))


### Features

- **theme:** Add the akira color ramp ([35ebe31](https://github.com/akira-io/ui/commit/35ebe31cd8e905d799bab172363c87714223248d))
- **theme:** Drive semantic tokens from the akira ramp ([705d93f](https://github.com/akira-io/ui/commit/705d93f04431a95402aba29aea1059f26c964566))
- **theme:** Add data-brand presets with the nosferry palette ([07f0435](https://github.com/akira-io/ui/commit/07f0435042463d32e75e47a36e33181b1bba34db))
- **i18n:** Ship the portuguese data table labels as a locale export ([2b3c3f5](https://github.com/akira-io/ui/commit/2b3c3f51275a733b7c7100ea1318a4a42f76c08e))
- **theme:** Give every container component its own surface ([70bfa49](https://github.com/akira-io/ui/commit/70bfa490b0ca831c2cf1df0267b7564a91e5d3bb))
- **language:** Give controls a glass surface and modals a solid edge ([f477921](https://github.com/akira-io/ui/commit/f477921fb6179d487f90f12d4d245ce815467aea))
- **language:** Unify surface, radius and control colour across the set ([c140692](https://github.com/akira-io/ui/commit/c140692eba6000100a6670551a90cb98a6c8b4ca))
- **package:** Ship the documentation with the package ([d8aea54](https://github.com/akira-io/ui/commit/d8aea54ed035f1557ba8b072cc6db1f166f70eb7))

