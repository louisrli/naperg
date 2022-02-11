# RSS Puller Implementation

## Step 0: Read this carefully
During the last project and throughout the course, I have noticed questions
being asked that sometimes illustrate that documentation or instructions were
not read. If this was your workplace and I was your boss, it would not be good.

Therefore, please be in the habit of reading something (instructions,
documentation) and knowing generally what information is there. You do not need
to memorize that information, but you should, for example, remember that there
are a series of steps that you should complete in order, and you can always
check the document if needed.

## Step 1. Seed sources
Seed some sources according to the Prisma schema. You are all familiar with
`seed.ts`. This time, you must seed **valid sources** with real RSS feed URLs.
Please add at least five sources. Please do not do this manually (i.e., insert
rows in the database using an admin tool); use the seed script.

## Step 2. Read the new GraphQL API
Familiarize yourself with the GraphQL API that I have written for you with
comments.

Ask yourself the following questions:
* How easy or hard would it be to understand these endpoints without comments
  above them?
* What can you do to get in the habit of writing such comments?

## Step 3. Write the script.
There instructions here will be brief, because there is a substantial amount of
pseudocode inside `script/puller.ts`. Please read the pseudocode carefully.

## Bonus section
* **Pagination**: Add pagination to the API and the part of the script that retrieves the
    sources. In a real app, you probably have too many sources to simply
    retrieve it in memory once.
* **Rate limiting**: Add
    [throttling](https://www.google.com/search?q=throttle+for+loop+node)
    somehow, again to prevent too many writes per second to the database.
