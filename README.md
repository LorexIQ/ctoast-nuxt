![cToastImage](https://github.com/LorexIQ/ctoast-nuxt/tree/master/assets/imgs/cToast.png)

# cToast

### Installation

```bash
$ npm i ctoast
```

Always use the latest version. It fixes all known bugs and does not cut out anything that was in the past.

### Connecting to the project

```nashorn js
// nuxt.config.js
export default {
  modules: [
    'ctoast'
  ]
}
```

### Setting standard parameters

There are 2 ways to pass parameters to the module

1. Transfer when adding a module
```nashorn js
// nuxt.config.js
export default {
  modules: [
    ['ctoast', { args }]
  ]
}
```
2. Passing parameters through the namespace
```nashorn js
export default {
  cToast: {
      args
  }  
}
```

### Parameters (args)

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

| Name        | Description                                                             | Default        | Acceptable values                                                                              |
|-------------|:------------------------------------------------------------------------|:---------------|------------------------------------------------------------------------------------------------|
| title       | Sets the text of the toast title page                                   | cToast         | Any string variable                                                                            |
| description | Sets the text of the comment on the toast                               |                | Any string variable                                                                            |
| type        | Sets the type of toast notification                                     | default        | `default`, `seccess`, `info`, `error` or an empty field. Then the `default` style will be used |
| icon        | Sets the toast icon                                                     | decodeTypes    | Any font Awesome icons, without **_fa-_** postscript                                           |
| delay       | Sets the interval from the moment the toast appears until it is deleted | 3000           | Any numerical values in milliseconds                                                           |
| timer       | Enables or disables the timer until the toast is deleted                | true           | `true` or `false`                                                                              |
| clickOn     | Sets the function for clicking the mouse on the toast                   | Empty function | Any function                                                                                   |
| clickDelete | Enables or disables deleting a toast by clicking on it                  | true           | `true` or `false`                                                                              |

<a name="ctoasts"></a>
#### ctoasts
| Name                                                      | Description          | Exceptions                                                       | Parameter              |
|-----------------------------------------------------------|:---------------------|:-----------------------------------------------------------------|------------------------|
| Any name that does not fall under the list of exceptions  | Unique custom toast  | `success`, `info`, `error`, `show`, `replace`, `delete`, `clear` | Object [toast](#toast) |

<a name="functions"></a>
### Functions

Standard functions for quickly calling toasts. At the moment there are 4 types: `default` `success`, `info` and `error`

```nashorn js
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

To call a test with a full list of parameters, the `show` function is used

```nashorn js
// full toast form
this.$ctoast.show({toast data})
// full tosts example
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
