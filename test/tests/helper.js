const loginWith = async (page, username, password) => {
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}
const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create new Blog' }).click()
  await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill(title);
  await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Author' }).click();
  await page.getByRole('textbox', { name: 'Author' }).fill(author);
  await page.getByRole('textbox', { name: 'URL' }).click();
  await page.getByRole('textbox', { name: 'URL' }).fill(url);
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByText(`\'${title}\' by ${author} was added`).waitFor()
}

const likeBlog = async (page) => {
  const secondDiv = page.locator('div').filter({ hasText: /^second blogs by second personView$/ })
  await secondDiv.getByRole('button', { name: 'View' }).click()
  await page.getByRole('button', { name: 'like' }).click()
  await page.getByRole('button',{name: 'Hide'}).click()
}

export { loginWith, createBlog, likeBlog }