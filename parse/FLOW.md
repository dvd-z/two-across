# Flow of parsing

## Table of Contents

#### [General pattern](#general)
#### [NYT](#nyt)
#### [WAPO](#wapo)
#### [WSJ](#wsj)

<a name="general"></a>
## General

1. Parse the links to individual crosswords.
2. Use puppeteer to navigate to those links.
3. Parse the across and down clues.
4. Parse the button to reveal the grid.
5. Use puppeteer to reveal the grid.
6. Parse the grid, taking in black boxes, ID, and answers.

<a name="nyt"></a>
### NYT

- The link parser will not parse links to Minis.
- Puppeteer does not need to click on a button to get to the crosswords since the URLs are given once parsed.
- The NYT requires a different `BASE_URL` constant because of duplicate routing in the crossword URLs.
- There is no reveal button parser because there is no identifying feature of the button. Instead, puppeteer's selector is used.

<a name="wapo"></a>
### WAPO

<a name="wsj"></a>
### WSJ
