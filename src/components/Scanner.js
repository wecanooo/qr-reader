/**
 * ISC License (ISC)
 * Copyright © 2020, <leeej@stunitas.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import React from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import {
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";

import { api } from "../config/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100vh",
  },
  header: {
    padding: "1rem 0",
    fontSize: "1rem",
    fontWeight: 600,
    textAlign: "center",
  },
  qr: {
    margin: "2rem 0",
  },
  center: {
    textAlign: "center",
  },
  retry: {
    width: 256,
    height: 256,
    borderRadius: 4,
    border: "solid 1px #ccc",
  },
}));

// QR 코드 생성 유효시간을 5초로 지정합니다.
// 2021.12.02, wecanooo
// QR 코드 생성 유효시간을 10초로 지정합니다.
// 2022.01.08, wecanooo
const INTERVAL = 13;

function Scanner() {
  const [open, setOpen] = React.useState(false);
  const [empKey, setEmpKey] = React.useState("");
  const classes = useStyles();

  const handleError = (err) => {
    alert(
      `QR 인식 기능이 정상적이지 않습니다. 관리자에게 문의해 주세요. 오류: ${err.message}`
    );
  };

  const handleScan = (data) => {
    if (!data) return;

    const values = data.split(",");

    if (!values[0] || values[0] !== "kids-lounge") {
      alert("데이터가 올바르지 않습니다. 다시 한번 시도해 주세요.");
      return;
    }

    const params = new URLSearchParams();
    const empKey = values[1];
    const uuid = values[2];
    const time = values[3];

    const d = new Date();
    d.setSeconds(d.getSeconds() - INTERVAL);

    if (time === undefined || time < d) {
      alert("QR 코드의 유효시간이 지났습니다. QR 코드를 갱신해 주세요.");
      return;
    }

    params.append("userKey", empKey);
    params.append("uuId", uuid);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(`${api.baseUrl}${api.commit}`, params, config)
      .then((response) => {
        const { result, message } = response.data;
        if (result === "FAIL") {
          alert(message);
          return;
        }

        setEmpKey(empKey);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      })
      .catch((err) => {
        alert(
          `QR 체크인 처리 중 오류가 발생되었습니다. 관리자에게 문의 바랍니다. 오류: ${err.message}`
        );
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <QrReader
        delay={1500}
        onError={handleError}
        onScan={handleScan}
        facingMode="user"
        style={{ width: "100%" }}
      />
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">{`${empKey}님 반갑습니다.`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            아침미팅 QR 체크인이 정상적으로 처리되었습니다. 오늘 하루도 좋은
            하루 되시길 바랍니다. 감사합니다.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Scanner;
