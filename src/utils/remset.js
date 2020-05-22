export function remset(designwidth) {
    // document.documentElement.style.fontSize = document.documentElement.clientWidth / (designwidth / 100) < 320 / (designwidth / 100) ? 320 / (designwidth / 100) : document.documentElement.clientWidth / (designwidth / 100) + 'px';

    // 设置最大根字体大小为100px
    let ddsFontsize = document.documentElement.clientWidth / (designwidth / 100) < 320 / (designwidth / 100) ? 320 / (designwidth / 100) : document.documentElement.clientWidth / (designwidth / 100);
    let ddsFontsizenew = ddsFontsize > 60 ? 60 : ddsFontsize;
    document.documentElement.style.fontSize = ddsFontsizenew + 'px';
    // console.log(document.documentElement.style.fontSize)
}