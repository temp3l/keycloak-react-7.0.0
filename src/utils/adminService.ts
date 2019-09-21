
import KcAdminClient from 'keycloak-admin';
import faker from 'faker';
declare let window: any;
const keycloak = window.keycloak;

export const fakeUser = () => ({
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  emailVerified: faker.random.boolean(),
  enabled: faker.random.boolean(), // enabled required to be true in order to send actions email
});


const service = () => {
  const kcAdminClient = new KcAdminClient({ baseUrl: window.baseURL, });
  kcAdminClient.setAccessToken(keycloak.token);
  keycloak.onAuthRefreshSuccess = () => {
    console.log('refreshin kyAdmins token');
    kcAdminClient.setAccessToken(keycloak.token);
  }

  const createUsers = () => {
    for (let i = 0; i < 100; i++) kcAdminClient.users.create(fakeUser());
  }
  const fetchAll = async () => {
    const users = await kcAdminClient.users.find();
    const groups = await kcAdminClient.groups.find();
    const roles = await kcAdminClient.roles.find();
    const clients = await kcAdminClient.clients.find();
    // kcAdminClient.clients.listRoles({id });
    return { users, groups, roles, clients }
  }




  return {
    // create: kcAdminClient.users.create,
    // find: kcAdminClient.users.find,
    // findOne: kcAdminClient.users.findOne,
    // update: kcAdminClient.users.update,
    // del: kcAdminClient.users.del,
    // executeActionsEmail: kcAdminClient.users.executeActionsEmail,
    // listGroups: kcAdminClient.users.listGroups,
    // resetPassword: kcAdminClient.users.resetPassword,
    // sendVerifyEmail: kcAdminClient.users.sendVerifyEmail,
    users: kcAdminClient.users,
    createUsers,
    fetchAll,
    fakeUser,
  }
}


export default service
