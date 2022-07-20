<div align="center">
  <img src="https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/cToast.png" />
  <h1>cToast</h1>
</div>
<p align="center">
  <a href="https://www.npmjs.com/package/ctoast"><img src="https://img.shields.io/npm/v/ctoast.svg?style=flat-square"/></a>
  <a href="https://github.com/vuejs/awesome-vue"><img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"/></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg?style=flat-square"/></a>
 </p>

***

## Menu
- [Installation](#install)
- [Connecting to the project](#connect)
- [Setting standard parameters](#default)
- [Parameters (args)](#args)
  - [positionPadding](#position_padding)
  - [toast](#toast)
  - [ctoasts](#ctoasts)
- [Methods](#methods)
    - [Methods `default`, `success`, `info`, `error`](#quick)
    - [Method `show`](#show)
    - [Method `showLoader`](#show_loader)
    - [Method `loaderStatus`](#loader_status)
    - [Method `replace`](#replace)
    - [Method `delete`](#delete)
    - [Method `clear`](#clear)

***

<a name="install"></a>
## Installation

```bash
$ npm i ctoast
```

Always use the latest version. It fixes all known bugs and does not cut out anything that was in the past.

***

<a name="connect"></a>
## Connecting to the project

```javascript
// nuxt.config.js
export default {
  modules: [
    'ctoast'
  ]
}
```

***

<a name="default"></a>
## Setting standard parameters

There are 2 ways to pass parameters to the module

1. Transfer when adding a module
```javascript
// nuxt.config.js
export default {
  modules: [
    ['ctoast', { args }]
  ]
}
```
2. Passing parameters through the namespace
```javascript
export default {
  cToast: {
      args
  }  
}
```

***

<a name="args"></a>
## Parameters (args)

| Name                 | Description                                                                                          | Default      | Acceptable values                                      |
|----------------------|:-----------------------------------------------------------------------------------------------------|:-------------|--------------------------------------------------------|
| namespace            | Sets the name space of a folder in modules, to avoid module conflicts                                | cToast       | Any names                                              |
| debug                | Displays the current configuration of the parameters in the console when the application is launched | false        | `true` or `false`                                      |
| position             | Sets the position of the notification block                                                          | right-bottom | `right-bottom`, `right-top`, `left-bottom`, `left-top` |
| maxToasts            | Maximum number of toasts per page at a time                                                          | 10           | Any numerical values                                   |
| infinityDestroyDelay | The time set for endless toasts                                                                      | 999999       | Any numerical values                                   |
| positionPadding      | Sets the margins of the notification block from the edges of the screen                              | Object       | [More detailed](#position_padding)                     |
| toast                | Sets the default toast when calling a toast with missing parameters                                  | Object       | [More detailed](#toast)                                |
| ctoasts              | Sets personalized toasts with unique parameters                                                      | Object       | [More detailed](#ctoasts)                              |

<a name="position_padding"></a>
#### positionPadding

| Name   | Description                   | Default | Acceptable values           |
|--------|:------------------------------|:--------|-----------------------------|
| top    | Sets the margin at the top    | null    | Any numerical css values    |
| right  | Sets the margin at the right  | null    | Any numerical css values    |
| bottom | Sets the margin at the bottom | null    | Any numerical css values    |
| left   | Sets the margin at the left   | null    | Any numerical css values    |

<a name="toast"></a>
#### toast

| Name        | Description                                                              | Default        | Acceptable values                                                                              |
|-------------|:-------------------------------------------------------------------------|:---------------|------------------------------------------------------------------------------------------------|
| name        | Sets a name for the toast. You can use it to remove or replace the toast |                | Any string variable                                                                            |
| title       | Sets the text of the toast title page                                    | cToast         | Any string variable                                                                            |
| description | Sets the text of the comment on the toast                                |                | Any string variable                                                                            |
| type        | Sets the type of toast notification                                      | default        | `default`, `seccess`, `info`, `error` or an empty field. Then the `default` style will be used |
| icon        | Sets the toast icon                                                      | decodeTypes    | Any font Awesome icons, without **_fa-_** postscript                                           |
| delay       | Sets the interval from the moment the toast appears until it is deleted  | 3000           | Any numerical values in milliseconds                                                           |
| timer       | Enables or disables the timer until the toast is deleted                 | true           | `true` or `false`                                                                              |
| clickOn     | Sets the function for clicking the mouse on the toast                    | Empty function | Any function                                                                                   |
| clickDelete | Enables or disables deleting a toast by clicking on it                   | true           | `true` or `false`                                                                              |

<a name="ctoasts"></a>
#### ctoasts
| Name                                                      | Description          | Exceptions                                                       | Parameter              |
|-----------------------------------------------------------|:---------------------|:-----------------------------------------------------------------|------------------------|
| Any name that does not fall under the list of exceptions  | Unique custom toast  | `success`, `info`, `error`, `show`, `replace`, `delete`, `clear` | Object [toast](#toast) |

***

<a name="methods"></a>
## Methods

<a name="quick"></a>
#### Methods `default`, `success`, `info`, `error`

Standard functions for quickly calling toasts. At the moment there are 4 types.

```javascript
// quicke toasts with parameters
this.$ctoast('Test Default', {toast data without title & type})
this.$ctoast.success('Test Success', {toast data without title & type})
this.$ctoast.info('Test Info', {toast data without title & type})
this.$ctoast.error('Test Error', {toast data without title & type})
// or quicke toasts without parameters
this.$ctoast('Test Default')
this.$ctoast.success('Test Success')
this.$ctoast.info('Test Info')
this.$ctoast.error('Test Error')
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/quickToastsTest.gif)

To call a test with a full list of parameters, the `show` function is used.

***

<a name="show"></a>
#### Method `show`

```javascript
// full toast form
this.$ctoast.show({toast data})

this.$ctoast.show({
  title: 'Test Show',
  description: 'End Test',
  type: 'success',
  icon: 'file-text',
  delay: 9000,
  timer: true,
  clickOn: () => {
      console.log(`Tested!!!`)
  },
  clickDelete: true
})
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/toastTest.gif)

***

<a name="show_loader"></a>
#### Method `showLoader` `NEW`
This type of toast is designed to remove spam from the website interface. It is called once with all the necessary 
parameters and then, as something is loaded on the page, using an additional method, the state of each of the 
parameters changes.

| Name            | Description                                                               | Default        | Acceptable values     |
|-----------------|:--------------------------------------------------------------------------|:---------------|-----------------------|
| errorData       | Sets a new test in case of a loading error (see ctoast.show parameters)   | { Object }     | [ctoast Data](#toast) |
| successData     | Sets a new test in case of a loading success (see ctoast.show parameters) | { Object }     | [ctoast Data](#toast) |
| errorFunction   | Sets the function that will execute when an error occurs                  | empty function | Any function          |
| successFunction | Sets the function that will execute on success                            | empty function | Any function          |

Loader has default parameters that are non-standard for other methods, some of which cannot be changed.

| Name        | Default               | Acceptable values                    |
|-------------|:----------------------|--------------------------------------|
| delay       | false (infinite mode) | Any numerical values in milliseconds |
| timer       | false                 | Immutable                            |
| clickOn     | empty function        | Immutable                            |
| clickDelete | false                 | Immutable                            |
| type        | info                  | Immutable                            |

Props standard:
```javascript
{
    nameSubLoader: title,
    ...  
}
```

An example of calling this toast

```javascript
// loader toast form
this.$ctoast.showLoader(name toast, data loader*, props)
// loader toast example
this.$ctoast.showLoader(
  'test-loader',
  {
    title: 'Test Loader',
    description: 'A new loader toast has been released. Check out the new documentation',
    errorData: {
      title: 'Good reviews have not been received',
      type: 'error'
    },
    successData: {
      title: 'Thank you for support',
      type: 'success'
    },
    errorFunction: () => console.log('error'),
    successFunction: () => console.log('success')
  },
  { 
    'test-1': 'search for an idea', 
    'test-2': 'implementation of the idea', 
    'test-3': 'good reviews' 
  }
)
```
![loaderSuccessTest](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/loaderSuccessTest.gif)
![loaderErrorTest](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/loaderErrorTest.gif)

To change the loading state, the `loaderState` method is used

***

<a name="loader_status"></a>
#### Method `loaderStatus` `NEW`

This method works in conjunction with showLoader and nothing else. The name of the toast loader, the name of the props element and the loading status `true` (success) or `false' (error) are passed to the call parameters

```javascript
// loader change status form
this.$ctoast.loaderStatus(name, name loader, status)
// loader change status example success
this.$ctoast.loaderStatus('loader-test', 'test-1', true)
// loader change status example error
this.$ctoast.loaderStatus('loader-test', 'test-2', false)
```
***

<a name="replace"></a>
#### Method `replace`
It is also possible to make toasts immortal. To do this, just enter the `false` value in the `delay` parameters.
Such toasts can be destroyed by _clicking the mouse_ (**if deletion is enabled**), _reloading the page_, _clearing all toasts_, _deleting by name_, but not by time (**unless you have infinityDestroyDelay set to a very small value**).
If you use immortal toast when loading something, then the `replace` function is perfect for your purposes.
The function will delete the immortal toast by its name and create a new one based on the data just passed.

```javascript
this.$ctoast.replace(name toast, {toast data})
// example
this.$ctoast.info('Test Replace', { delay: false, name: 'test-replace'})
this.$ctoast.replace('test-replace', { title: 'Replaced!' })
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/replaceTest.gif)

***

<a name="delete"></a>
#### Method `delete`

A function that deletes a toast by its name.

```javascript
this.$toast.delete(name toast)
// example
this.$ctoast.error('Test Delete', { delay: false, name: 'test-delete'})
this.$ctoast.delete('test-delete')
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/clearTest.gif)

***

<a name="clear"></a>
#### Method `clear`

The function deletes all existing toasts. Does not need parameters.

```javascript
this.$ctoast.clear()
```
![quickToasts](https://raw.githubusercontent.com/LorexIQ/ctoast-nuxt/HEAD/assets/imgs/clearTest.gif)

***

Enjoy using my toasts 🤗
