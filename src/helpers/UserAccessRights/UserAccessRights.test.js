import UserAccessRights from './UserAccessRights';
import ACCESS_RIGHTS from 'constants/accessRights';


describe('helpers - UserAccessRights', () => {
  test('contain necessary methods', () => {
    const ar = new UserAccessRights({});

    expect(ar).toHaveProperty('hasPermission');
    expect(ar).toHaveProperty('isAdmin');
  });

  test('is admin method', () => {
    const ar = new UserAccessRights({
      role: ACCESS_RIGHTS.ROLES.BROKER,
      permissions: [ACCESS_RIGHTS.PERMISSIONS.WORKER_VIEW_REWARD]
    });

    expect(ar.isAdmin()).toBeFalsy();

    ar._currentRole = ACCESS_RIGHTS.ROLES.SUPERBROKER;

    expect(ar.isAdmin()).toBeTruthy();
  });

  test('check permissions', () => {
    const ar = new UserAccessRights({
      role: ACCESS_RIGHTS.ROLES.BROKER,
      permissions: [ACCESS_RIGHTS.PERMISSIONS.WORKER_VIEW_REWARD]
    });

    expect(ar.hasPermission(ar.ps.WORKER_VIEW_REWARD)).toBeTruthy();
    expect(ar.hasPermission(ar.ps.ORDERS_BROKER_VIEW_SELF_ORDERS)).toBeFalsy();

    ar._currentPermissions.push(ar.ps.ORDERS_BROKER_VIEW_ORGANIZATION_ORDERS);

    expect(ar.hasPermission([
      ar.ps.WORKER_VIEW_REWARD,
      ar.ps.ORDERS_BROKER_VIEW_ORGANIZATION_ORDERS
    ])).toBeTruthy();
  });
});
