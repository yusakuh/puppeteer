# 機能概要
- 対象のホームページに対して、登録番号、パスワードを自動入力し、必要な処理を行う

# 各設定ファイルについて

##envファイルについて

- puppeteer_register配下に.envファイルを作成し、対象となるホームページのURLを書く

```
URL=https://XXXXXXXXXXXX.com
```

# EXCELファイルについて

- puppeteer_register配下にregistrationInformation.xlsxを作成する
- シート名を「memberlist」とし、以下のような情報を記載する

| Id | Name | RegistrationId | Password | Used |
|----|------|----------------|----------|------|
| 1  | A    | 111111         | 222222   | 1    |
| 2  | B    | 333333         | 444444   | 0    |
| 3  | C    | 555555         | 666666   | 1    |
| 4  | D    | 777777         | 888888   | 0    |
※Usedは1がtrue, 0がfalseで判定される。index.jsではtrueのものに対してのみ処理が行われる
