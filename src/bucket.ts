// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as aws from "aws-sdk";
import * as core from "@actions/core";

export const fileExists = async (
  bucketName: string,
  path: string,
  accessKeyId?: string,
  secretAccessKey?: string,
  region?: string
): Promise<boolean> =>
  new Promise(resolve => {
    const s3 = new aws.S3({
      apiVersion: "2006-03-01",
      accessKeyId:
        accessKeyId === undefined
          ? process.env["AWS_ACCESS_KEY_ID"]
          : accessKeyId,
      secretAccessKey:
        secretAccessKey === undefined
          ? process.env["AWS_SECRET_ACCESS_KEY"]
          : secretAccessKey,
      region: region === undefined ? process.env["AWS_DEFAULT_REGION"] : region
    });
    const params = {
      Bucket: bucketName,
      Key: path
    };
    s3.headObject(params, (err, data) => {
      if (err && err.code === "NotFound") {
        core.debug("File " + path + " doesn't exist in bucket " + bucketName);
        // Return false as the file doesn't exist.
        resolve(false);
      } else {
        core.debug("File " + path + " exists in bucket " + bucketName);
        resolve(true);
      }
    });
  });

export const readFile = async (
  bucketName: string,
  path: string,
  accessKeyId?: string,
  secretAccessKey?: string,
  region?: string
): Promise<string> =>
  new Promise(resolve => {
    const s3 = new aws.S3({
      apiVersion: "2006-03-01",
      accessKeyId:
        accessKeyId === undefined
          ? process.env["AWS_ACCESS_KEY_ID"]
          : accessKeyId,
      secretAccessKey:
        secretAccessKey === undefined
          ? process.env["AWS_SECRET_ACCESS_KEY"]
          : secretAccessKey,
      region: region === undefined ? process.env["AWS_DEFAULT_REGION"] : region
    });
    const params = {
      Bucket: bucketName,
      Key: path
    };
    s3.getObject(params, (err, data) => {
      if (err) {
        // TODO
        resolve(undefined);
      } else {
        resolve(data.Body?.toString());
      }
    });
  });

export const putFile = async (
  bucketName: string,
  path: string,
  content: string,
  accessKeyId?: string,
  secretAccessKey?: string,
  region?: string
): Promise<void> =>
  new Promise((resolve, reject) => {
    const s3 = new aws.S3({
      apiVersion: "2006-03-01",
      accessKeyId:
        accessKeyId === undefined
          ? process.env["AWS_ACCESS_KEY_ID"]
          : accessKeyId,
      secretAccessKey:
        secretAccessKey === undefined
          ? process.env["AWS_SECRET_ACCESS_KEY"]
          : secretAccessKey,
      region: region === undefined ? process.env["AWS_DEFAULT_REGION"] : region
    });
    const params = {
      Bucket: bucketName,
      Key: path,
      Body: content
    };
    s3.putObject(params, (err, data) => {
      if (err) {
        core.warning(
          "The upload of the file " +
            path +
            " with the content " +
            content +
            " failed: " +
            err.code
        );
        reject();
      } else {
        core.debug(
          "The latest development version was uploaded to bucket " + bucketName
        );
        resolve();
      }
    });
  });

export const getDefaultPath = async (version: string): Promise<string> =>
  new Promise(resolve => {
    const repository = process.env["GITHUB_REPOSITORY"]?.replace("-", "_");
    const path = repository + "/" + version + "_version.txt";
    resolve(path);
  });
