const NYT = 'nyt';
const WAPO = 'wapo';
const WSJ = 'wsj';

module.exports = {
    ACROSS: 'across',
    DOWN: 'down',
    LABEL: 'label',
    MIDDLE: 'middle',
    NYT: NYT,
    NYT_LINK_SUBSTR: '/crosswords/game/daily/',
    SOURCES: [NYT, WAPO, WSJ],
    SOURCE_BASE_URL_MAP: new Map([
        [NYT, 'https://www.nytimes.com']
    ]),
    SOURCE_URL_MAP: new Map([
        [NYT, 'https://www.nytimes.com/crosswords'],
        [WAPO, 'https://www.washingtonpost.com/crossword-puzzles/daily/'],
        [WSJ, 'https://blogs.wsj.com/puzzle/category/crossword/']
    ]),
    START: 'start',
    TEXT: 'text',
    TEXT_ANCHOR: 'text-anchor',
    WAPO: WAPO,
    WSJ: WSJ
};
