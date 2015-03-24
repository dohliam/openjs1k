* [1 The problem](#the-problem)
  * [1.1 Why it's important](#why-its-important)
  * [1.2 Why licensing entries is a good idea](#why-licensing-entries-is-a-good-idea)
* [2 Purpose](#purpose)
* [3 To do](#to-do)
  * [3.1 Have source repo, no license](#have-source-repo,-no-license)
  * [3.2 Have source and contact info, no license](#have-source-and-contact-info,-no-license)
  * [3.3 No source, no license](#no-source,-no-license)
* [4 Viewing the entries](#viewing-the-entries)
* [5 Acknowledgements](#acknowledgements)
* [6 License](#license)

# The problem

As many JavaScript enthusiasts are aware, [js1k](http://js1k.com/) is an amazing and often inspiring annual js coding golf competition that is frequently also quite educational (in the sense of "Wow, [you can do _that_ in js](http://js1k.com/2014-dragons/demo/1951)?!").

For those wanting to re-use any of this great code in their projects, however, [there is a problem](http://js1k.com/about):

    Demo content is subject to copyright of their respectful owners. Do not copy/mirror without their explicit consent.

While on a larger level it is of course disappointing that all js1k entries are not released with a free license, there are likely very good practical reasons for the organizers to leave copyright with the authors. That is _not_ the problem.

The problem is that the contest rules do not require contestants to choose _a_ license of some kind ([any license! ...even a non-free one!](http://blog.codinghorror.com/pick-a-license-any-license/)) when submitting their entries. Thus, most of the hundreds of interesting and useful entries have no license information whatsoever, and some do not even list an author or (still) valid contact information.

## Why it's important

Of course, if all entries were deliberately copyrighted by their authors that would be one thing, but it is difficult to escape the feeling that many (perhaps most?) authors do not license their work simply because they have never considered the possibility that their code might be useful to others outside of the context of the contest.

It doesn't help that, with the huge number of entries in every contest, even internal links on the js1k site often become broken (e.g., all of the details pages for the 2011 Oregon Trail competition), making it difficult or even impossible to check the license or even contact information for a given entry. For example, the top winning entry for 2011 links to this non-existing page: `http://js1k.com/2011-trail/details/984`.

Of the relatively small proportion of js1k entries that include licensing information, the vast majority use the MIT license or assign to the public domain. This leads me to believe that, if asked, many authors would not have a problem with freely-licensing their work. They simply never thought it might be necessary, and furthermore, as noted above, the contest rules themselves do not require making a choice about a license.

## Why licensing entries is a good idea

There are many excellent reasons for licensing one's work when making it public, no matter how small or insignificant it may seem. Many of these are already outlined [here](http://choosealicense.com/no-license/) and [here](http://blog.codinghorror.com/pick-a-license-any-license/). Without going into further depth, there are a couple of very practical considerations for both authors and the general public.

* For authors, choosing a license, even if only to assert "all rights reserved", allows them to preempt inquiries from those (such as the maintainer of this repo) who would like to know about the licensing status of their work. If an author has gone out of their way to put a © notice on their work, others will be unlikely to bother asking if it is ok to free license or reuse it.
* Someone else in the distant future might have a use for your code that you could never have anticipated beforehand. By that time you may be unreachable or your contact information may be out of date. Your snippet of code could make a huge difference to someone who might be unable to use it, because they have no idea whether you would approve its use, and may not even be able to contact you to find out.

If this last point seems farfetched, consider that much of the listed contact information for contest authors from the first contest in 2010 is already out of date. Quite a few entrants just leave a Twitter handle or website as author info, and -- unsurprisingly -- these can lead to Twitter accounts that have been deleted and websites that no longer exist. In many cases that means that it is already impossible to know if these authors would have been willing to open-license their work.

That is a loss for the whole community.

# Purpose

* To create a repository of as many freely-licensed js1k entries as possible
* To raise awareness among entrants of the importance of releasing code with a license (preferably free!)
* To encourage js1k organizers to consider requiring that entrants select a license before submitting to the contest


# To do

This list is being constantly expanded and revised. Going through the vast amount of entries is a time-consuming process. If you have the contact info for an author listed here (or for any entry not included in this repo), you can help by asking them to provide a free license for their entry.

## Have source repo, no license
The following js1k submissions are included in Github repos without license information. Authors should be contacted individually to request adding a license.

* [Mine[love]craft, Strange_crystals_II, Buggy_island](https://github.com/ehouais/js1k) | https://github.com/ehouais/js1k | @ehouais
* [Elimination!](http://js1k.com/2014-dragons/demo/1777) | https://github.com/polgfred/js1k | @polgfred
* [Tron](http://js1k.com/2013-spring/demo/1428) | https://github.com/alexturpin/js1k-tron | @alexturpin
* [2048@938](http://js1k.com/2014-dragons/demo/1862) | https://github.com/npup/js1k-2014 | @npup
* [Cloudy heart](http://js1k.com/2012-love/details/1247) | https://github.com/tehmou/js1k-bubbling-heart | @tehmou
* [Fuse](http://js1k.com/2012-love/details/1254) | https://gist.github.com/aemkei/1989127 | @aemkei
* [Conway's Game of Life](http://js1k.com/2012-love/details/1111) | https://github.com/aaronm67/js1k | @aaronm67

## Have source and contact info, no license
The following js1k submissions are not included in any public Github repo but author contact information (or at least a name) is available. Authors should be contacted individually to request a free license.

* [1K Boing Ball](http://js1k.com/2014-dragons/details/1672) | [Nikola Fox](https://github.com/juusu) | @juusu
* [Have you ever tried to catch a firefly?](http://js1k.com/2013-spring/details/1462) | [Carlos Nieto](https://github.com/xiam) | @xiam
* [GORILLAS.JS2K](http://js1k.com/2014-dragons/details/1971) | [https://github.com/koenkivits](Koen Kivits) | @koenkivits
* [Move the ball through the game using the mouse cursor](http://js1k.com/2010-first/details/823) | [Romain Huet](https://github.com/romainhuet) | @romainhuet
* [YASS (yet another simple shmup)](http://js1k.com/2014-dragons/details/1793) | [Luis Toledo](https://github.com/luistoledo) | @luistoledo
* [Over The Hills](http://js1k.com/2013-spring/details/1542) | [Joshua Koo](https://github.com/zz85/) | @zz85
* [Color-Vision Simulation & Daltonization for Protanopic Observers ](http://js1k.com/2010-first/details/391) | [Michael Deal](https://github.com/mudcube) | @mudcube
* [RGB color spectrum mixer](http://js1k.com/2010-first/details/102) | [Michael Deal](https://github.com/mudcube) | @mudcube
* [Hypotrochoid with dynamically changing color and diameter](http://js1k.com/2010-first/details/210) | [Michael Deal](https://github.com/mudcube) | @mudcube
* [Galaxies visualization](http://js1k.com/2010-first/details/166) | [Michael Deal](https://github.com/mudcube) | @mudcube
* [Psychedelic spectro-spirographs](http://js1k.com/2010-first/details/92) | [Michael Deal](https://github.com/mudcube) | @mudcube
* [Breath](http://js1k.com/2014-dragons/details/1648) | [Anton Khlynovskiy](https://github.com/subzey) | @subzey
* [雨RAIN](http://js1k.com/2015-hypetrain/details/2135) | [Martin Kleppe](https://github.com/aemkei) | @aemkei
* [Lorenz Attractor](http://js1k.com/2010-first/details/216) | [Martin Kleppe](https://github.com/aemkei) | @aemkei
* [8-Bit RPG Battle!](http://js1k.com/2012-love/details/1175) | [Hugo Bonacci](https://github.com/hugoware) | @hugoware
* [Canvas Grid ](http://js1k.com/2010-first/details/726) | [Vladimir Carrer](https://github.com/vladocar) | @vladocar
* [updated 3d particle system](http://js1k.com/2010-first/details/753) | [Paul Brunt](https://github.com/supereggbert) | @supereggbert

## No source, no license
These submissions include neither an unobfuscated source nor a license, but do have author contact information. Authors should be contacted individually to request releasing the source code under a free license.

* [Pulsing 3d wires with volumetric beams](http://js1k.com/2010-first/details/171) | [Steven Wittens](https://github.com/unconed) | @unconed
* [Synth Sphere](http://js1k.com/2013-spring/details/1558) | [Noah Weninger](https://github.com/nwoeanhinnogaehr) | @nwoeanhinnogaehr
* [js1k Poker](http://js1k.com/2011-trail/demo/949) | [Martin Kleppe](https://github.com/aemkei) | @aemkei

# Viewing the entries

All of the freely-licensed js1k entries included in this repository can be viewed using the [js1k Competition Entry Browser](https://dohliam.github.io/jsbrowser/), or by following the [links to the original demos](https://github.com/dohliam/openjs1k/tree/master/js).

# Acknowledgements

Many thanks to the folks at codegolf (@xem, @subzey, @p01, @aemkei, @mathias) for the inspiration!

And a very big thank you to all the authors who took the time to freely license their code.

# License

The project itself is released under the MIT License (see LICENSE file for details). As the majority of entries that include a license use MIT, it seemed easiest to use that license here too. Individual entries retain their original license.

An overview of the included scripts and further details about individual entries can be found in the [README.md](https://github.com/dohliam/openjs1k/tree/master/js) file in the js/ directory. Please see the table in that file for full license information and author credits for all entries.
