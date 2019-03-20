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

<a name="wapo"></a>
### WAPO

<a name="wsj"></a>
### WSJ
