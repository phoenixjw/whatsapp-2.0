const getRecipientEmail = (user, userLoggedIn ) => 
    user?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]


export default getRecipientEmail; 