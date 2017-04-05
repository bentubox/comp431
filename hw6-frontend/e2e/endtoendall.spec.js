import { expect, assert } from 'chai'
import { driver, until, go, sleep, findId, findCSS, By } from './selenium'

const creds = { username: 'bnt1test', password: 'at-repeat-ask'}
const stringBank = [
    "CRIME BUS", "PUGNACIOUS TAMALE", "DAMN ASYNCS", "KILL ME", "TEST TEXT TEST TEXT TEST TEXT",
    "IT'S A DISASTER", "ACK ACK ACK ACK ACK", "DEFAULT STRING", "MORE OPTIONS", "LOL", "NO", "PLS"
    ]
const emailBank = ['lol@what.com', 'test@test.com', 'me@my.com', 'pls@help.com', 'lee@bron.com', 'stone@cold.com', 'why@me.com', 'no@way.com']
const zipcodeBank = ['12345', '11111', '22222', '33333', '55555', '66666', '77777', '88888' ]

const successStatus = '<font color="lime">'
const login = () => {
    sleep(100)
        .then(findId('usrname').clear())
        .then(findId('password').clear())
        .then(findId('usrname').sendKeys(creds.username))
        .then(findId('password').sendKeys(creds.password))
        .then(findId('loginbtn').click())
}

const gotoProfile = () => {
    sleep(500)
        .then(findId('mainToProfilebtn').click())
}

describe('Authentication tests: ', () => {
    
    before('should navigate to page', (done) => {
        go().then(done)
    })

    it('should register a new user', (done) => {
        const user = {
                username: 'Dummy',
                displayname: 'DummyName',
                email: 'Dummy@Email.com',
                phone: 1234567890,
                dob: '01-30-1990',
                zip: 88888,
                password: 'password',
                passwordconfirm: 'password'
            }
        
        sleep(500)
            .then(findId('accname').clear())
            .then(findId('name').clear())
            .then(findId('email').clear())
            .then(findId('phone').clear())
            .then(findId('zip').clear())
            .then(findId('password0').clear())
            .then(findId('password1').clear())
            .then(findId('accname').sendKeys(user.username))
            .then(findId('name').sendKeys(user.displayname))
            .then(findId('email').sendKeys(user.email))
            .then(findId('phone').sendKeys(user.phone))
            .then(findId('dob').sendKeys(user.dob))
            .then(findId('zip').sendKeys(user.zip))
            .then(findId('password0').sendKeys(user.password))
            .then(findId('password1').sendKeys(user.passwordconfirm))
            .then(findId('regbtn').click())
            .then(driver.wait(until.elementTextContains(findId('statusLanding'), 'Registered')))
            .then(findId('statusLanding').getText()
                .then((text) => {
                    expect(text).includes(user.username)
                }))
            .then(findId('statusLanding').getInnerHtml()
                .then((html) => {
                    expect(html).includes(successStatus)
                }))
            .then(done).catch((err) => {
                console.log(err)
            })
    })

    it('should login as a test user', (done) => {        
        sleep(500)
            .then(login)
            .then(driver.wait(until.elementLocated(By.id('statusMain'))))
            .then(driver.wait(until.elementTextContains(findId('statusMain'), 'Logged in')))
            .then(findId('statusMain').getText()
                .then((text) => {
                    expect(text).includes(creds.username)
                }))
            .then(findId('statusMain').getInnerHtml()
                .then((html) => {
                    expect(html).includes(successStatus)
                }))
            .then(done).catch((err) => {
                console.log(err)
            })
    })
})

describe('Main page article, headline, and follower tests: ', () => {
    before('should navigate to page and login', (done) => {
        go().then(login).then(done)
    })
    
    it('should create a new article and validate that it appears in the feed', (done) => {
        const articleText = stringBank[Math.floor(Math.random() * stringBank.length)]
        
        sleep(500)
            .then(driver.wait(until.elementLocated(By.id('post'))))
            .then(driver.wait(until.elementLocated(By.id('pageFilter'))))
            .then(driver.wait(until.elementLocated(By.id('deck'))))
            .then(findId('postArticle').clear())
            .then(findId('filterInput').clear())
            .then(findId('filterbtn').click())
            .then(findId('postArticle').sendKeys(articleText))
            .then(findId('postArticlebtn').click()
            .then(sleep(2000))
            .then(findId('deck').findElements(By.className('articleCard'))
                .then( (elements) => {
                   elements[0].findElement(By.id('articleText'))
                    .then( (element) => {
                            element.getText()
                                .then( (text) => {
                                    expect(text).to.eql(articleText)
                                })
                    })
                })))
            .then(done).catch((err) => {
                console.log(err)
            })
    })

    it('should edit an article and verify that the text has changed', (done) => {
        const newArticleText = stringBank[Math.floor(Math.random() * stringBank.length)]

        sleep(500)
            .then(findId('deck').findElements(By.className('articleCard'))
                .then( (elements) => {
                    // Use the most recent article, which should have been created in the previous test.
                    elements[0].findElement(By.id('editButton')).click()
                    .then(sleep(500))
                    .then(elements[0].findElement(By.id('editArticle')).clear())
                    .then(elements[0].findElement(By.id('editArticle')).sendKeys(newArticleText))
                    .then(elements[0].findElement(By.id('saveButton')).click())
                    .then(sleep(500))
                    .then(elements[0].findElement(By.id('articleText')).getText()
                        .then( (text) => {
                            expect(text).to.eql(newArticleText)
                        }))
                }))
            .then(done).catch((err) => {
                console.log(err)
            })            
    })

    it('should update the status headline and verify that the text has changed', (done) => {
        const newHeadline = stringBank[Math.floor(Math.random() * stringBank.length)]

        sleep(500)
            .then(findId('newStatus').clear())
            .then(findId('newStatus').sendKeys(newHeadline))
            .then(findId('updateStatusButton').click())
            .then(sleep(500))
            .then(findId('userHeadline').findElement(By.id('headerStatus')).getText()
                .then( (text) => {
                    expect(text).to.eql(`"${newHeadline}"`)
                }))
            .then(done).catch((err) => {
                console.log(err)
            }) 
    })

    it('should add Follower and verify that the follower count increases by one', (done) => {
        sleep(500)
            .then(findId('followers').findElements(By.id('follower'))
                .then( (children) => {
                    const count = children.length
                    sleep(500)
                    .then(findId('followerNameInput').clear())
                    .then(findId('followerNameInput').sendKeys("Follower"))
                    .then(findId('addFollowerButton').click())
                    .then(sleep(1000))
                    .then(findId('followers').findElements(By.id('follower'))
                        .then( (newChildren) => {
                            expect(newChildren.length).to.be.eql(count + 1)
                        }))
                }))
            .then(done).catch((err) => {
                console.log(err)
            }) 
    })

    it('should remove Follower from follower list and verify that the count decreases by one', (done) => {
        sleep(500)
            .then(findId('followers').findElements(By.id('follower'))
                .then( (children) => {
                    const count = children.length
                    sleep(500)
                    .then(children[children.length - 1].findElement(By.id('removeFollower')).click())
                    .then(sleep(1000))
                    .then(findId('followers').findElements(By.id('follower'))
                        .then( (newChildren) => {
                            expect(newChildren.length).to.be.eql(count - 1)
                        }))                    
                }))
            .then(done).catch((err) => {
                console.log(err)
            })  
    })

    it('should Search for "Only One Article Like This" and verify only one article shows, and verify the author', (done) => {
        sleep(500)
            .then(findId('filterInput').clear())
            .then(findId('filterInput').sendKeys('Only One Article Like This'))
            .then(findId('filterbtn').click())
            .then(sleep(500))
            .then(findId('deck').findElements(By.className('articleCard'))
                .then( (elements) => {
                    expect(elements).to.have.length(1)
                    elements[0].findElement(By.id('articleInfo')).getText()
                        .then( (text) => {
                            console.log(text)
                            expect(text).includes(creds.username)
                        })
                }))
            .then(done).catch((err) => {
                console.log(err)
            }) 
    })
})

describe('Profile page updating tests: ', () => {
    before('should navigate to page', (done) => {
        go().then(login).then(gotoProfile).then(done)
    })
    
    it('should navigate to profile view, update email, and verify the change', (done) => {
        const newEmail = emailBank[Math.floor(Math.random() * emailBank.length)]
        sleep(500)
            .then(findId('newEmail').clear())
            .then(findId('newEmail').sendKeys(newEmail))
            .then(findId('update').click())
            .then(sleep(1000))
            .then(findId('oldEmail').getText()
                .then( (text) => {
                    expect(text).to.eql(newEmail)
                }))
            .then(findId('newEmail').clear())
            .then(done).catch((err) => {
                console.log(err)
            })
    })

    it('should navigate to profile view, update zipcode, and verify the change', (done) => {
        const newZipcode = zipcodeBank[Math.floor(Math.random() * zipcodeBank.length)]
        sleep(500)
            .then(findId('newZip').clear())
            .then(findId('newZip').sendKeys(newZipcode))
            .then(findId('update').click())
            .then(sleep(1000))
            .then(findId('oldZip').getText()
                .then( (text) => {
                    expect(text).to.eql(newZipcode)
                }))
            .then(findId('newZip').clear())
            .then(done).catch((err) => {
                console.log(err)
            })
    })

    it('should navigate to profile view, update password, and verify that a rejection message is received', (done) => {
        const newPassword = 'SWORDFISH'
        sleep(500)
            .then(findId('newPassword').clear())
            .then(findId('newPassword').sendKeys(newPassword))
            .then(findId('newPasswordConfirm').clear())
            .then(findId('newPasswordConfirm').sendKeys(newPassword))
            .then(findId('update').click())
            .then(sleep(1000))
            .then(findId('statusProfile').getText()
                .then( (text) => {
                    expect(text).includes('will not change')
                }))
            .then(findId('newPassword').clear())
            .then(findId('newPasswordConfirm').clear())
            .then(done).catch((err) => {
                console.log(err)
            })
    })
})

describe('shutdown', () => {
    it('now', done => {
        sleep(3000)
        .then(driver.quit())
        .then(done)
    })
})
