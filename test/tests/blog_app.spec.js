const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Super user',
        username: 'test',
        password: 'test'
      }
    })
    await page.goto('http://localhost:3001')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('LOGIN INTO BLOGLIST APP')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'test')
      await expect(page.getByRole('button', { name: 'log out' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'testtt')
      const errorDiv = page.locator('.errorNoti')
      await expect(errorDiv).toContainText('Login unsuccessful: invalid username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Playwright Test', 'NNQ', 'NoName.com')

      const newBlog = page.getByText(`\'Playwright Test\'  by NNQ was added`)
      await expect(newBlog).toBeVisible()
    })

    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blogs', 'first person', 'fp.com')
        await createBlog(page, 'second blogs', 'second person', 'sp.com')
      })

      test.only('one of those can be like', async ({ page }) => {
        await page.pause()
        likeBlog(page)
        await expect(page.getByText('1like')).toBeVisible()
      })
      test.only('the user who added the blog can delete the blog', async ({ page }) => {
        page.on('dialog', async dialog => {
          expect(dialog.message()).toBe("Remove blog 'first blogs' by first person")
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'Remove' }).first().click()
        await expect(page.getByText('first blogs by first person')).not.toBeVisible()
      })
      test.only('the blogs are arranged in the order according to the likes', async ({ page }) => {
        await page.pause();
        const title = 'second blogs by second person'
        await likeBlog(page)
        
        const firstBlog = page.locator('.blog-default').first()
        await expect(firstBlog).toContainText(title)
      })
      describe('add another users', () => {
        beforeEach(async ({ page, request }) => {
          // Create another user
          await request.post('http://localhost:3001/api/users', {
            data: {
              name: 'Another User',
              username: 'another',
              password: 'another'
            }
          })
        })
        test.only(' only the user who added the blog sees the delete button', async ({ page }) => {
          await page.pause()

          await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible()
          await page.getByRole('button', { name: 'log out' }).click()
          await loginWith(page, 'another', 'another')
          await expect(page.getByRole('button', { name: 'Remove' }).first()).not.toBeVisible()
        })
      })
    })
  })
})