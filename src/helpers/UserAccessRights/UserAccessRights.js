import ACCESS_RIGHTS from 'constants/accessRights';


class UserAccessRights {
  constructor({ permissions = [], role }) {
    this._currentRole = role;
    this._currentPermissions = permissions;
    this.ps = ACCESS_RIGHTS.PERMISSIONS;
  }

  /**
   * @param {string | string[]} permission
   * @returns {boolean}
   */
  hasPermission(permission) {

    if (!permission) {
      return false;
    }

    let has = true;
    const { _currentPermissions } = this;

    if (Array.isArray(permission)) {
      permission.forEach((p) => {
        if (!_currentPermissions.includes(p)) {
          has = false;
        }
      })
    } else {
      has = _currentPermissions.includes(permission);
    }

    return has;
  }

  isAdmin() {
    return this._currentRole === ACCESS_RIGHTS.ROLES.SUPERBROKER;
  }
}

export default UserAccessRights;
