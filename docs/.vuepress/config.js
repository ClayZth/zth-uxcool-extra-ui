module.exports = {
    title: 'zthUxcoolExtraUI',
    base: '/zth-uxcool-extra-ui/',
    description: 'UxCool Extra UI',
    port: 8083,
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '组件', link: '/component/guide/introduction' },
        ],
        sidebar: {
            '/component/': [{
                    title: '指南',
                    collapsable: false,
                    children: [
                        'guide/introduction',
                        'guide/guide'
                    ]
                },
                {
                    title: '组件',
                    collapsable: false,
                    children: [
                        'basic/mutiInput',
                        'basic/dragCard',
                    ]
                },
            ]
        }
    }
}