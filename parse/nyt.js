const $ = require('cheerio');

module.exports = async html => {
    return $('a', html).filter((i, el) =>
        $(el).attr('href')
    ).filter((i, el) =>
        $(el).attr('href').includes('/crosswords/game/daily/')
    ).map((i, el) =>
        el.attribs.href
    ).toArray();
}