## Prerequisites
+ Clone or download [angular2-redux-example](https://github.com/rangle/angular2-redux-example)
+ Get your GA account
+ Follow the provided links below for GTM setup and installation
    + [Create an account and container](https://support.google.com/tagmanager/answer/6103696?hl=en&ref_topic=3441530#CreatingAnAccount)
    + [Add the container snippet](https://developers.google.com/tag-manager/quickstart)

_src/index.html_
```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXX');</script>
            <!-- End Google Tag Manager -->

            ...

        </head>
        <body>
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->

            ...

        </body>
    </html>
```

The code snippet above shows where your GTM container snippet should be added (_you will have to replace `GTM-XXXXXX` with your own GTM ID that you created before_).
