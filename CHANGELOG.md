# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

