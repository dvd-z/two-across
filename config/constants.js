const NYT = 'nyt';
const WAPO = 'wapo';
const WSJ = 'wsj';

module.exports = {
    ACROSS: 'across',
    DOWN: 'down',
    LABEL: 'label',
    NYT: NYT,
    NYT_LINK_SUBSTR: '/crosswords/game/daily/',
    SOURCES: [NYT, WAPO, WSJ],
    SOURCE_URL_MAP: new Map([
        [NYT, 'https://nytimes.com/crosswords'],
        [WAPO, 'https://washingtonpost.com/crossword-puzzles/daily/'],
        [WSJ, 'https://blogs.wsj.com/puzzle/category/crossword/']
    ]),
    TEXT: 'text',
    WAPO: WAPO,
    WSJ: WSJ
};
