/**
 * craigslist/filters
 **/

 module.exports = {
  max_price: 800,
  min_price: 400,
  neighborhoods: [
    {name: 'hawthorne', points: 10},
    {name: 'boise', points: 10},
    {name: 'mississippi', points: 10},
    {name: 'ladds addition', points: 10},
    {name: 'alberta', points: 5},
    {name: 'buckman', points: 5},
    {name: 'hollywood', points: 5},
    {name: 'irvington', points: 5},
    {name: 'inner se', points: 5},
  ],
  keywords: [
    {slug: 'roommates', points: 10},
    {slug: 'roomate', points: 5},
    {slug: 'male', points: 5},
    {slug: 'female', points: 10},
    {slug: 'vegetarian', points: 10},
    {slug: '20s', points: 30},
    {slug: '20\'s', points: 30},
    {slug: 'whole foods', points: 10},
    {slug: 'new seasons', points: 10},
    {slug: 'chickens', points: 10}
  ]

 }
