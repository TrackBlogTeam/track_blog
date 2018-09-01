<?php
/**
 * Created by PhpStorm.
 * User: Administrator: littlebabyyoung
 * Date: 7/17/2018
 * Time: 2:02 PM
 */

// Status code table
// code:
// 812: Administrator logs in successfully
// 813: Lack of parameters for logging in
// 814: Session already exists the logged state of current actor
// 815: Unknown role of the sender of the message
// 816: User logs in successfully
// 817: Administrator's login fails for unmatched username and password
// 818: User's login fails for unmatched username and password
// 819: Not enough authentication for administrator/user
// 820: Success to retrieve profile of an administrator
// 821: Fail to logout for non-existent login status
// 822: Success to retrieve table  from database
// 823: No data in this table or this table doesn't exist
// 824: User registered successfully
// 825: User registered unsuccessfully
// 826: Successfully logged out
// 827: Wrong type of message
// 828: Fail to publish for not logged or for role of "administrator"
// 829: Fail to publish for unknown reasons
// 830: Success to publish
// 831: Fail to publish for invalid parameters
// 832: Fail to retrieve table. Permission denied.
// 833: Fail to retrieve table. Invalid parameter(s).
// 834: Fail to retrieve table. Invalid table name.
// 835: Fail to retrieve profile. Not logged.
// 836: Fail to retrieve articles. Lack of parameter(s).
// 837: Fail to register. Incomplete parameter(s).
// 838: Fail to upload portrait. More than 1 files have been uploaded
// 839: Fail to upload portrait. Illegal upload.
// 840: Fail to upload portrait. The size of the image doesn't meet the demand
// 841: Success to upload portrait.
// 842: Fail to upload portrait. Incorrect signed status.
// 843: Fail to upload portrait. Incorrect type of image. (bmp, jpg, png)
// 844: Fail to upload portrait. Unknown reason.
// 845: Fail to save draft. Not logged or for role of "administrator"
// 846: Fail to save draft. Lack of parameter(s).
// 847: Success to save draft.
// 848: Fail to save draft. Unknown reasons.
// 849: Fail to retrieve drafts. Not signed.
// 850: Fail to retrieve drafts. Invalid role.
// 851: Fail to edit draft. Not signed.
// 852: Fail to edit draft. Invalid role.
// 853: Fail to edit draft. Invalid parameter(s).
// 854: Fail to edit article. Not signed.
// 855: Fail to edit article. Invalid role.
// 856: Fail to edit article. Invalid parameter(s).
// 857: Success to update article.
// 858: Fail to update article. Unknown reason
// 859: Fail to sign up. Invalid phone number.
// 860: Fail to sign up. Username's existed