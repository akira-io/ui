# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0](https://github.com/akira-io/ui/compare/v3.1.0...v3.2.0) (2026-10-10)

### Bug Fixes

- **blocks:** Make the stat card variants announce and focus their figures ([4b78c3e](https://github.com/akira-io/ui/commit/4b78c3e6fbe0b0086e2692232a5f5e12c29d0f14))
- **blocks:** Keep stat card figures, shares and legends consistent at the edges ([3848ec6](https://github.com/akira-io/ui/commit/3848ec60688f02efaccaa3d84e60872e4e652548))
- **overlays:** Portal menu submenus out of the clipping parent content ([d3ecde1](https://github.com/akira-io/ui/commit/d3ecde1352830e8cbd53220193632c3b2eae0c62))
- **theme:** Give the nosferry preset its chart palette ([b685d9a](https://github.com/akira-io/ui/commit/b685d9af6fc490d53d536b0781c338cc84302879))
- **locales:** Move the European Portuguese locale to the current spelling ([698b590](https://github.com/akira-io/ui/commit/698b590a2bf7affe9ec4ab4856f3c679f4f56089))
- **shells:** Light only the most specific nav item and keep rail groups open ([c549725](https://github.com/akira-io/ui/commit/c549725a55cd2ca64ff6476da2f13fc466700385))
- **scripts:** Build the export detector program without the default lib ([b6ca728](https://github.com/akira-io/ui/commit/b6ca7283378a4ba2744ada49bc60d56770501029))
- **charts:** Round only the outer ends of a stacked bar ([a26e2c7](https://github.com/akira-io/ui/commit/a26e2c786143bcf397598b8fcafcf9b7e036003d))
- **charts:** Format tooltips and time axes with the chart locale ([aa12226](https://github.com/akira-io/ui/commit/aa122266153f9d15f82aa8fb493e9a2de4efe548))
- **charts:** Clip each side of a stacked bar and keep thin ends whole ([f9637dd](https://github.com/akira-io/ui/commit/f9637dd07c0d96dbce5d25838dfe06495c716613))
- **charts:** Keep a hidden value axis numeric ([e32b6c1](https://github.com/akira-io/ui/commit/e32b6c197e97d7eb019033961fe5324e3b9a0ac7))
- **charts:** Skip value labels on empty and cramped segments ([e507fea](https://github.com/akira-io/ui/commit/e507feab61be0eea1693727b3816cba4b87bf225))
- **charts:** Keep value labels compact, apart and inside the chart ([1d8948d](https://github.com/akira-io/ui/commit/1d8948dafeedb4a5dc9ef76d875822875f420221))
- **charts:** Draw each stacked bar as one shape divided by color ([59d4110](https://github.com/akira-io/ui/commit/59d41108a2f7b9e44552312dd7ab0843334c9ed0))
- **blocks:** Draw the composition track as one shape divided by color ([81d1c50](https://github.com/akira-io/ui/commit/81d1c50d0d252297a76aee844781b06fc6e22238))
- **charts:** Follow the animated segment and key stack clips by position ([bad0c31](https://github.com/akira-io/ui/commit/bad0c31645dd6b1060d74312a9214081d878c99b))
- **blocks:** Keep the composition track one element with a measured radius ([d34b2a2](https://github.com/akira-io/ui/commit/d34b2a2534fb556c6b460670df4b4c6fc44dbea4))
- **blocks:** Centre the two-factor code field and recovery actions ([674c39c](https://github.com/akira-io/ui/commit/674c39c79a92df6913c8e9055e7fec123b2d573f))
- **blocks:** Describe recovery codes and drop stale errors when the challenge switches mode ([dd9e81c](https://github.com/akira-io/ui/commit/dd9e81ca69f111e1c874f37b780b4993f362c87c))
- **locales:** Stop telling readers recovery codes are shown only once ([103c168](https://github.com/akira-io/ui/commit/103c168995f74fc8f4f4f224adea55e5c6a78a08))
- **blocks:** Hide only the errors on screen when the two-factor mode switched ([7d5aea6](https://github.com/akira-io/ui/commit/7d5aea6def2c52df0eeb1ec737ef4a7ab70c781d))
- **blocks:** Show a repeated two-factor error once the next attempt finishes ([a114778](https://github.com/akira-io/ui/commit/a114778ae8703ad265dac3964149c4b1b9f93e40))
- **shells:** Make collapsible group labels real buttons ([12c9b6c](https://github.com/akira-io/ui/commit/12c9b6c21d46eadb35003e3bd5bac61a59daef3d))
- **shells:** Keep the sidebar logo whole on the icon rail ([a8bdadc](https://github.com/akira-io/ui/commit/a8bdadc550ccc3536f00a71af0dcc37502060f32))
- **blocks:** Name the tour close control from the locale ([ccffcbc](https://github.com/akira-io/ui/commit/ccffcbc4bc6401665f47340775eca4ff540f728f))
- **locales:** Announce loading in the locale ([b1b7aee](https://github.com/akira-io/ui/commit/b1b7aee1064f97bef253f8bb797c72cf49af7916))
- **charts:** List legend entries in the order of the series ([2c316ac](https://github.com/akira-io/ui/commit/2c316ac8f1b8784d95cb9e879812011900154413))
- **charts:** Order the legend by the index of each series ([4da7c46](https://github.com/akira-io/ui/commit/4da7c467df91a96d164064134d9db374b37e19e7))
- **blocks:** Skip tour steps whose target is missing and record the outcome ([7fccc73](https://github.com/akira-io/ui/commit/7fccc73c5d3637b89d3bcffdb1e9fe8d9e8fad2d))
- **blocks:** Wait briefly for a later tour target and ignore clicks meanwhile ([6f73f34](https://github.com/akira-io/ui/commit/6f73f34df29ac351454628592fa311acb54d9115))
- **blocks:** Ignore going back when no earlier tour step is on the page ([f6660b9](https://github.com/akira-io/ui/commit/f6660b93980e420ae54c4c1e55c5336a5762589e))
- **blocks:** Record a running tour before another one replaces it ([8527db7](https://github.com/akira-io/ui/commit/8527db7a618c4aec9f4c0f48e018ce81747169d9))
- **blocks:** Let a tour started from onProgress take over cleanly ([d0c319e](https://github.com/akira-io/ui/commit/d0c319e4eb97b35e08f021fc3e65bde14acef583))
- **shells:** Hydrate collapsed nav groups from defaultOpen ([3a44324](https://github.com/akira-io/ui/commit/3a443244b262b6ae7bbdc1ede9a65a0153c96b29))
- **shells:** Keep nav groups toggling when storage is unavailable ([a935374](https://github.com/akira-io/ui/commit/a9353745161674b332285bb43ff42f82b9f4a385))
- **shells:** Draw unlabelled subgroups and subgroup item badges ([ebc0f64](https://github.com/akira-io/ui/commit/ebc0f643b21685f77a3c9ddd8bd01b9ed83a044c))
- **shells:** Keep subgroup badges beside the link and key siblings apart ([e73e89e](https://github.com/akira-io/ui/commit/e73e89ebaf760aeb7d4b5bb068844d596feb6e56))
- **shells:** Shrink the header search button to its icon below sm ([a727d62](https://github.com/akira-io/ui/commit/a727d62959aa546f1a4a276e1c1f249b94e598fe))
- **shells:** Keep the header breadcrumbs on one line on narrow screens ([a565602](https://github.com/akira-io/ui/commit/a5656022dc676ff36d74469d623f2eeece9910c8))
- **shells:** Leave standalone breadcrumbs as they were ([84044e4](https://github.com/akira-io/ui/commit/84044e41a2bbb8b1ba2ec8b99e8a03c3166f3eba))
- **time-picker:** Keep the field, the columns and the stored value in step ([dcbc277](https://github.com/akira-io/ui/commit/dcbc27743bf59955ade2e3172b6bf9d34cff0a63))
- **time-picker:** Keep the selected option visible and the columns aligned ([63abcbc](https://github.com/akira-io/ui/commit/63abcbcb116d608af9a6e9e984f09571bafc9387))
- **date-time-picker:** Bound the full date and time ([a0a3cb7](https://github.com/akira-io/ui/commit/a0a3cb7105a9196b1069fc67cffd28170550a2d6))
- **blocks:** Wait for tour targets once and drop the missing steps ([12c9a35](https://github.com/akira-io/ui/commit/12c9a35e035b1774add05883e23d3a7169ddbc35))
- **blocks:** Render the tour progress label as text ([cc5790b](https://github.com/akira-io/ui/commit/cc5790bb5d0c47055a2811f97ceff3c37f142ab5))
- **blocks:** Settle a waiting tour start against the running tour ([023a3cf](https://github.com/akira-io/ui/commit/023a3cfa12d38c6654232a7c28973ca4ef608ba0))
- **blocks:** Keep a shared tour start and count the steps still shown ([7ad6905](https://github.com/akira-io/ui/commit/7ad6905052df949dd27593bfa183db8e63fad902))
- **blocks:** Format default percentages in the provider locale ([bde8259](https://github.com/akira-io/ui/commit/bde82591916289a7b74f30479a2a8561fa7cd910))
- **locales:** Agree the data table total with its count ([3d95117](https://github.com/akira-io/ui/commit/3d9511713e85772191bc4bf24b027ddedf9558d0))
- **blocks:** Fall back to en-US for a malformed number locale ([36d88d3](https://github.com/akira-io/ui/commit/36d88d36ba7e1262694314ed8f60f3291caf5796))


### Code Refactoring

- **shells:** Serve the cookie reader only from the server entry ([67d9f18](https://github.com/akira-io/ui/commit/67d9f182c1e2a539bcbd81ff0d2b04cf358faacb))
- **date-picker:** Share the day boundaries ([55367df](https://github.com/akira-io/ui/commit/55367df22842ef3001c2701cc4cb3fc0132b82f5))
- **ui:** Share the picker trigger, clear control and value state ([32cb0a9](https://github.com/akira-io/ui/commit/32cb0a9ab19fff21a5d8d9953336864bee03f131))


### Features

- **command:** Let CommandDialog forward props to the inner Command ([7147166](https://github.com/akira-io/ui/commit/7147166cfc86191dd974f43c9589067fec5b7506))
- **combobox:** Let Combobox take a filter function for the inner Command ([3dde235](https://github.com/akira-io/ui/commit/3dde235cac239e0670ecf2620856f7f8a0cf22b1))
- **blocks:** Give the stat card an inline layout and an exact value line ([d5b907a](https://github.com/akira-io/ui/commit/d5b907a45c5dad873baa7a1daa6be61337e6f4c0))
- **blocks:** Let a stat card show its share as a bar with a tooltip ([1f81407](https://github.com/akira-io/ui/commit/1f8140743196196a4715e93890d5e5930a005c24))
- **blocks:** Add a stat breakdown card for a total split into parts ([2d91d27](https://github.com/akira-io/ui/commit/2d91d275e7485c00061b0b127a0438abe33d5737))
- **blocks:** Add a brand logo that takes its colors from the brand preset ([05c6668](https://github.com/akira-io/ui/commit/05c666848af5f1ee78fefdd83ae7c0c48cb21075))
- **charts:** Let a bar chart color its bars by category ([e3d8d71](https://github.com/akira-io/ui/commit/e3d8d71f82e2b5095a73d4c1de2933363eb551ae))
- **blocks:** Let a danger zone action require the current password ([b931537](https://github.com/akira-io/ui/commit/b931537926b70acce1109a70552d784d849735c4))
- **two-factor:** Add an enable button and the fetch error labels ([bb228d6](https://github.com/akira-io/ui/commit/bb228d62f63cffc976cf98325dc068f7b8f28ebe))
- **inertia:** Add a Fortify two-factor hook ([526cbbc](https://github.com/akira-io/ui/commit/526cbbcdf195a5a7bf1237f58e25d70102b1c4d8))
- **shells:** Let apps add their own entries to the user menu ([7984617](https://github.com/akira-io/ui/commit/7984617426f7f5563d93b84e89b219f95d9891d7))
- **shells:** Read the settings layout heading from the locale ([e387f8e](https://github.com/akira-io/ui/commit/e387f8eeb60e385cb9c50f0dfccc77c3c5a91fde))
- **blocks:** Add a notification bell with an unread badge and popover ([01c2d47](https://github.com/akira-io/ui/commit/01c2d474d98d23a950518b7d092757037f7a1ac9))
- **inertia:** Add an Inertia notification bell that polls while active ([b44f16f](https://github.com/akira-io/ui/commit/b44f16f715e454d353fc96d833d9a3487ff46382))
- **charts:** Add value domains, log scales and reference lines ([e066e85](https://github.com/akira-io/ui/commit/e066e853aabc302430dd78924f36b3521ef35c35))
- **charts:** Add value labels, lollipop bars and gradient areas ([cec7821](https://github.com/akira-io/ui/commit/cec7821531256e692e16f28587612c556ec3b4f4))
- **blocks:** Add a CompositionBar for a total split into parts ([f6bb38e](https://github.com/akira-io/ui/commit/f6bb38e96cec34c03191a23ae6fe47b7c47fdb2a))
- **charts:** Add a symmetric value domain with rounded ticks ([5d3c513](https://github.com/akira-io/ui/commit/5d3c5136e252b52f41add3943111cac945582c1f))
- **charts:** Show exact values in tooltips by default ([8411c23](https://github.com/akira-io/ui/commit/8411c23bf405f3764c10462a8947b0141173aa79))
- **shells:** Read the sidebar_state cookie from a server-safe entry ([2e86a57](https://github.com/akira-io/ui/commit/2e86a572cd147c5c9e8b1863c4e6d695cd983077))
- **shells:** Let AppSidebar render without a user and take a footer ([d2976a7](https://github.com/akira-io/ui/commit/d2976a72d61f69028b1795fc0456000c7c6917c1))
- **shells:** Let AppSidebar choose how it collapses ([63ea33e](https://github.com/akira-io/ui/commit/63ea33ec78c0d2adc57cc26acd31a15f5424a1c8))
- **shells:** Restore the remembered sidebar state on load ([1d1a00a](https://github.com/akira-io/ui/commit/1d1a00afad81a1930ed7afde39734ea918ca332f))
- **types:** Let nav groups nest and declare their default state ([9bcd7d0](https://github.com/akira-io/ui/commit/9bcd7d054d418a6115bed686be663031164aaa19))
- **shells:** Render nested nav groups in NavMain and AppSidebar ([1a25a93](https://github.com/akira-io/ui/commit/1a25a9386ced3927cafd41ca019bbb0c391fcf83))
- **time-picker:** Add the time value helpers ([2fb99bf](https://github.com/akira-io/ui/commit/2fb99bf6ed72baf9d52e4bb50cd935546f1c9fbe))
- **locales:** Add the time picker sections ([acc7cce](https://github.com/akira-io/ui/commit/acc7cce88fc12159dd2e8e14ecf068e60dfa3a09))
- **time-picker:** Add the hour and minute columns ([ef3a185](https://github.com/akira-io/ui/commit/ef3a18511ce9cffdbfd3c7eabfa6304af5d8fc7b))
- **field:** Give the field label an id controls can reference ([8188f73](https://github.com/akira-io/ui/commit/8188f735a051540bc41862f9d05218d4189d29f2))
- **time-picker:** Add the TimePicker ([1d85a28](https://github.com/akira-io/ui/commit/1d85a28382f851e1e5f5311dfacdf4a4d91e694e))
- **date-time-picker:** Add the DateTimePicker ([8f03eed](https://github.com/akira-io/ui/commit/8f03eed37f5ede25537d4e2a5318702f120a027f))

## [3.1.0](https://github.com/akira-io/ui/compare/v3.0.0...v3.1.0) (2026-10-02)

### Bug Fixes

- **locales:** Spell the Portuguese locale in European Portuguese ([a0a980d](https://github.com/akira-io/ui/commit/a0a980d1df7f57d83b73f35a9e9734aaf7f7893d))
- **locales:** Reach EmptyState, DangerZone, form overlays and Editor ([c1535b8](https://github.com/akira-io/ui/commit/c1535b8e32f9308e8232100e334079dc91bca4c4))
- **locales:** Let the locale provider name the shadcn primitives ([cd9e448](https://github.com/akira-io/ui/commit/cd9e448ff8efd44d203e5db3bcf68976ba684592))
- **theme:** Paint the root background overscroll reveals ([be94677](https://github.com/akira-io/ui/commit/be94677ddd54effb15053557db4fa88deb88f091))
- **inertia:** Omit only from table filter visits when undefined ([c703164](https://github.com/akira-io/ui/commit/c70316443d709aa809c5e5948c56d3c758d22674))
- **theme:** Keep the nested-surface reset when a surface is renamed ([092bf2e](https://github.com/akira-io/ui/commit/092bf2e15de138047206b14ea9a5a7c8d3f5b783))
- **theme:** Mark the floating sheet panel as a surface ([9fbfa94](https://github.com/akira-io/ui/commit/9fbfa9425915f93b5e2c1fbc24e9f69b35afd6ab))


### Features

- **shells:** Add actions slot to AppSidebarHeader ([42beca7](https://github.com/akira-io/ui/commit/42beca78a1831ab19301f678d25170ceeef1b460))
- **editor:** Style task lists and ship taskListExtensions ([5014eb1](https://github.com/akira-io/ui/commit/5014eb12a231b232e06c2ee72cf409ca9afb0622))
- Export the props types consumers wrap ([31d4b6d](https://github.com/akira-io/ui/commit/31d4b6de5b677ca2ffa52b2bfd3a39b351232efd))
- **locales:** Add spanish labels ([30d5496](https://github.com/akira-io/ui/commit/30d54961c2df586cd60dcfbbb4418ca2736596b1))
- **data-table:** Pin the actions column to the inline end ([87d2e30](https://github.com/akira-io/ui/commit/87d2e30b77de8334b5dbbdcd528c6de3f61e7297))
- **shells:** Let a sidebar nav item carry a badge ([04197c1](https://github.com/akira-io/ui/commit/04197c133ba8fb4b2f9d0a204eff9d448e502d88))
- **blocks:** Move the info field copy control to the label row ([0140559](https://github.com/akira-io/ui/commit/0140559431b847d54a3149e54b457255da4141e1))
- **shells:** Let the app name the sidebar user menu entries ([11c6dd6](https://github.com/akira-io/ui/commit/11c6dd6c930aa09930e7f85ec11f8c747775eced))

## [3.0.0](https://github.com/akira-io/ui/compare/v2.6.0...v3.0.0) (2026-09-19)

### Breaking Changes

- **build:** Ship charts, data table and form from their own entry points ([eb93de9](https://github.com/akira-io/ui/commit/eb93de933d9a11ab1deae349140309ec2e971141))


### Bug Fixes

- **tests:** Stop charging a cold barrel import to the test timeout ([0ccc9df](https://github.com/akira-io/ui/commit/0ccc9dfb520ba68c89a24b78f82b0c81d1ac8431))
- **date-filter:** Follow the provider date locale instead of pinning Portuguese ([9e11f56](https://github.com/akira-io/ui/commit/9e11f56a0e5f86a4401d315dff94eabce29d2666))
- **locales:** Export the date locale hook from the blocks entry ([20fcb0b](https://github.com/akira-io/ui/commit/20fcb0b5250fe4a0cdb1b902b006142366068aa3))
- **chart:** Keep series colors apart when two keys sanitize to the same name ([6db2f92](https://github.com/akira-io/ui/commit/6db2f921a44c2b263d82cff99050302ece951194))
- **passkeys:** Keep the removal confirmation open when it fails ([2e05578](https://github.com/akira-io/ui/commit/2e05578f811027159d3540da00910db907457b63))
- **passkeys:** Draw the passkey blocks from the design language ([afc8285](https://github.com/akira-io/ui/commit/afc8285604b95dfc774d466a37552fb4173bd359))
- **passkeys:** Seat the passkey list on Card like the settings entries ([d0a76d7](https://github.com/akira-io/ui/commit/d0a76d7515c7500d72b21f92f34b36f794a4d451))
- **two-factor:** Hold the qr at a fixed size and read the setup key as a field ([fd997f7](https://github.com/akira-io/ui/commit/fd997f7e870e490285f79a8f9b824be8fc4e80a9))
- **two-factor:** Scroll the setup dialog body and keep the heading and action in view ([c477ee9](https://github.com/akira-io/ui/commit/c477ee982420c1fa7d9f76375d0f69cd219b7d2c))
- **two-factor:** Wrap the revealed setup key and cap image qr codes to the frame ([e78792e](https://github.com/akira-io/ui/commit/e78792e165d33416afae98cfda95b9fdb49c56dd))


### Features

- **calendar:** Follow the date locale of the locale provider ([583e058](https://github.com/akira-io/ui/commit/583e058080056294a2f16602d1dd290ce53c4413))
- **two-factor:** Read labels from the locale provider ([b93ba56](https://github.com/akira-io/ui/commit/b93ba56ff6f4483e69d08b92acc76041d3222a65))
- **passkeys:** Add composable passkey blocks ([bd26822](https://github.com/akira-io/ui/commit/bd2682265cfffca2be326afd6eff22b7730dae18))
- **inertia:** Bind the passkey blocks to @laravel/passkeys ([bfd3f2e](https://github.com/akira-io/ui/commit/bfd3f2e2ff479ad250cc243372d1203a72611647))

## [2.6.0](https://github.com/akira-io/ui/compare/v2.5.0...v2.6.0) (2026-09-17)

### Bug Fixes

- **chart:** Keep the series variable spellable as a custom property ([99ad302](https://github.com/akira-io/ui/commit/99ad3028ff13fa7a173720b6282471c2da19691c))
- **chart:** Declare the donut colors above its legend ([23dbac0](https://github.com/akira-io/ui/commit/23dbac019e595aaac1d7fd59eccaa378de555db3))
- **chart:** Give the donut ring a width under a bottom legend ([e66783a](https://github.com/akira-io/ui/commit/e66783a6e1ab1bce9f57917649462b79f0fc430d))
- **chart:** Stop a series key or color from reaching the stylesheet raw ([73e6da7](https://github.com/akira-io/ui/commit/73e6da776fe9808d738fc31a1d10b8fa7479ce9f))
- **button:** Keep the internal variant out of the copy button API ([2644f76](https://github.com/akira-io/ui/commit/2644f767f025aae6695a324bcf5adf6b66fce3de))
- **table:** Drop the inner surface a bleeding table still painted ([bea854f](https://github.com/akira-io/ui/commit/bea854f0ca01ec235c38d4e89f54a444d8af0ded))
- **toast:** Let an action handler return a value ([4f521a1](https://github.com/akira-io/ui/commit/4f521a1e23e315b17a9ad73a575a68b0203886e1))
- **toast:** Hold the toast open when an action fails, and vet its link ([15e67d1](https://github.com/akira-io/ui/commit/15e67d19a80bc9e2b7ff6e306c3f38e033164e29))
- **toast:** Report a failed action instead of letting it escape ([285e1e2](https://github.com/akira-io/ui/commit/285e1e24ba7c8b66cc22d36a583d2dbdf3b4c5e6))
- **field:** Let an application translate the required-field label ([703f47b](https://github.com/akira-io/ui/commit/703f47b1725871b71b843f825851536dae9d17b1))
- **toast:** Strip the control characters a URL parser removes from an action link ([4ebe315](https://github.com/akira-io/ui/commit/4ebe31562b3b6a46cb88c68bcd7bdce6a9567367))
- **editor:** Refuse a link whose scheme the URL parser reassembles ([0ad93a4](https://github.com/akira-io/ui/commit/0ad93a4c49dd7eafbcc3fa07c3852b9c3c2c6002))


### Features

- **chart:** Add a series palette and high-level chart components ([e4bfd1f](https://github.com/akira-io/ui/commit/e4bfd1f9bf0c9f23fa1e6e46fb6a1f237c51c9ef))
- **chart:** Paint the charts on the first render ([43baec5](https://github.com/akira-io/ui/commit/43baec5b7ac73ddc3bd68ae63e8da1e17e4a2b20))
- **button:** Let every variant carry a tone ([f686186](https://github.com/akira-io/ui/commit/f6861866cda4ccbee8ee424f484de274ae83d187))
- **table:** Let a table bleed to the edges of its card ([0d9e395](https://github.com/akira-io/ui/commit/0d9e3952d0e9110875c5b366382710a4420d183d))
- **toast:** Style the actions, the cancel and the close button ([ae4a835](https://github.com/akira-io/ui/commit/ae4a83563b637bec8e9f409571eeea11621b040b))
- **build:** Publish a built dist branch for git installs ([5bafce2](https://github.com/akira-io/ui/commit/5bafce29e31577314225681fad056aa25cb8a64e))

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

