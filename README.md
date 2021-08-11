# create-advanced-template

[![Build Status](https://www.travis-ci.com/martuuamengual/create-advanced-template.svg?token=SCvQhQXQFkXx2UytEoxi&branch=master)](https://www.travis-ci.com/martuuamengual/create-advanced-template)
[![codecov](https://codecov.io/gh/martuuamengual/create-advanced-template/branch/master/graph/badge.svg?token=OTWW85ZSZB)](https://codecov.io/gh/martuuamengual/create-advanced-template)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmartuuamengual%2Fcreate-advanced-template.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmartuuamengual%2Fcreate-advanced-template?ref=badge_shield)

> Creating projects has never been so easy Woooff 🐺

<p align="center">
  <img width="600" src="docs/examples/npx.svg">
</p>

> Demo generated with [svg-term-cli](https://github.com/marionebl/svg-term-cli)
>
> `svg-term --cast=qpWeTgxhxpKWwMfdZ0tB6ESoo --out examples/npx.svg --window --height=20 --width=80`

---

## About and Goal

**create-advanced-template** is a CLI that allows you to create an application based on a template. Our goal is to help software developers in the task of creating new projects, save them time and effort and that way they can develop amazing applications!

---

## Table of Contents

1.  [Documentation](#documentation)
    1.  [Getting Started](#getting-started)
    2.  [How to use](#how-to-use)
2.  [How to create my own template](#how-to-create-my-own-template)
3.  [Incoming Features](#incoming-features)
4.  [Contributing](#contributing)
5.  [License](#license)

---

## [Documentation](#documentation)

### [Getting Started](#getting-started)

**npx**

      npx create-advanced-template

**npm**

      npm install -g create-advanced-template
      create-advanced-template

**yarn**

      yarn global add create-advanced-template
      create-advanced-template

### [How to use](#how-to-use)

**Commands**

#### `create-advanced-template [args]`

This is the main command to create a template.
<br/>
<br/>
Once executed, some questions will be asked to configure the template.
<br/>
**[args]** (opcional)

---

#### `create-advanced-template template-example-name`

This command would create an app using the template we provide. In our case, our template would be `template-example-name`. **It is important that the template name must exist in the organization [`@react-templating`](https://github.com/react-templating)**. If you want to create your own template see [How to create my own template](#how-to-create-my-own-template)

---

#### `create-advanced-template https://github.com/user/template-name.git`

This command would create an app using the template we provide but with the difference that said template **does not need to be in the organization @react-templating**

---

## [How to create my own template](#how-to-create-my-own-template)

By default the supported templates are found in this [link](docs/builtin-templates.md). You can also have your own templates, you have two ways to create them. The first is to upload the template to your preferred repository (github, gitlab, bitbucket, etc), for a more detailed guide go to this [link](docs/create-a-template-using-my-account.md). Or you can also make a request upload template to `@react-templating/my-example-template`, **this is the better way**, for a more detailed guide enter to this [link](docs/create-a-template-using-@react-templating.md) (at this moment we only suport to upload react templates to @react-templating, in future we want to suport more like Angular and others)

## [Incoming Features](#incoming-features)

- [ ] Download a specific version of an template

## [Contributing](#contributing)

Write a email to **martuu.amengual@gmail.com**

## [License](#license)

Created by martuuamengual. **MIT** license
