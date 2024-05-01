let UrlFetchData = (function () {
  class UrlFetchData {
    fetchData(apiUrl, apiToken, methodType, payload) {
      let data;
      if (methodType === "get") {
        data = {
          method: "Get",
          headers: {
            Authorization: apiToken,
          },
        };
      } else {
        data = {
          method: "Post",
          headers: {
            Authorization: apiToken,
            "Content-Type": "application/json",
          },
          payload: JSON.stringify(payload),
        };
      }
      const resp = UrlFetchApp.fetch(apiUrl, data);
      return JSON.parse(resp);
    }

    getslackfetchid(token, email, apiEmail) {
      const opt = {
        method: "post",
        headers: {
          Authorization: token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        payload: {
          email: email,
        },
      };
      let resp = UrlFetchApp.fetch(apiEmail, opt);
      let getData = JSON.parse(resp.getContentText());
      return getData.user.id;
    }

    print() {
      console.log(JSON.stringify(this.get(row)));
      return true;
    }
  }
  return UrlFetchData;
})();
if (typeof module !== "undefined") module.exports = UrlFetchData;
