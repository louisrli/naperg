/**
 * A script that checks RSS feeds and refreshes and checks only those that need
 * to be updated.
 *
 * Note that this script ONLY interacts with a GraphQL API (in this case, it
 * happens to be the same one that the frontend uses, for simplicity). It does
 * not touch Prisma directly. It should not touch Prisma directly. If you are
 * tempted to use Prisma directly, then you are thinking incorrectly about the
 * clean division of responsibilities.
 *
 * Of course, in this case, this script happens to be in the same repository as
 * the Prisma things, but that's only for convenience of delivering the code to
 * you.
 *
 * For further reference, see "architecture 0" on the lecture slides.
 */


async function main() {
  // Retrieve the sources from 
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

