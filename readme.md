# Car usage by local authority

Got fed up with a map of the UK going round saying most people drive to work.

It's misleading because it's not adjusted for population.

Chucked this together in an hour. Rough notes follow:

```
https://github.com/odileeds/hexmaps hexmap here https://github.com/odileeds/hexmaps/tree/gh-pages/maps

https://www.ons.gov.uk/census/maps/choropleth/housing/number-of-cars-or-vans/number-of-cars-3a/no-cars-or-vans-in-household


Just using https://odileeds.github.io/odi.hexmap.js/
```

Uses https://github.com/odileeds/hexmaps

# Further work

I probably won't find time but it would be neat to make a userscript that replaces the maps on e.g. https://www.ons.gov.uk/census/maps/choropleth/housing/number-of-cars-or-vans/number-of-cars-3a/no-cars-or-vans-in-household with hexmaps. They include the data as CSVs of ward/authority names -> numbers so it shouldn't be much work
