# cToast

### Installation

```bash
$ npm i ctoast
```

Always use the latest version. It fixes all known bugs and does not cut out anything that was in the past.
...snip...    
<a name="headers"/>
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
| debug                | Displays the current configuration of the parameters in the console when the application is launched | false        | `true`, `false`                                        |
| position             | Sets the position of the notification block                                                          | right-bottom | `right-bottom`, `right-top`, `left-bottom`, `left-top` |
| maxToasts            | Maximum number of toasts per page at a time                                                          | 10           | Any numerical values                                   |
| infinityDestroyDelay | The time set for endless toasts                                                                      | 999999       | Any numerical values                                   |
| positionPadding      | Sets the margins of the notification block from the edges of the screen                              | Object       |                                                        |
| toast                | Sets the default toast when calling a toast with missing parameters                                  | Object       |                                                        |
| ctoasts              | Sets personalized toasts with unique parameters                                                      | Object       |                                                        |

#### positionPadding


##### Table of Contents
[Headers](#headers)  
[Emphasis](#emphasis)  

## Headers
