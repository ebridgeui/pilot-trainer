(function(n){var t={backQuestion:"#back-question",nextQuestion:"#next-question",selectGetQuestion:".question",selectQuestionItem:".questionList li",answerQuestion:".questionOptionList li",questionOptionItemLink:".questionOptionList li a",questionNoteSave:"#saveNote",markQuestionPinSave:"#markQuestionPin",finishTest:"#saveTest",finishExam:"#saveExam",demoAnswer:"#demoAnswer",approveRealExam:".approveRealExam",cancelExamOk:"#cancelExamOk",examId:"#examId",finishExamModal:".finishExamModal",commentList:"#commentList",getNextCommentsBtn:"#getNextCommentsBtn",userId:"#userId",likeBtn:".glyphicon-thumbs-up",likeCounter:"#LikeCount",unlikeBtn:".glyphicon-thumbs-down",unLikeCounter:"#UnLikeCount",complaintBtn:"#SendEmailToAdmin",insertNewCommentBtn:"#insertNewComment",deleteCommentModal:"#deleteMyCommentModal",deleteCommentBtn:"#deleteMyComment",yesDeleteCommentBtn:".yesDeleteComment",complainTypeList:"#complainTypeList",commentId:"#commentId",complainCommentIdSetter:".complainModal",questionId:"#questionId",questionNumber:"#questionNumber",complainMessage:"#complainMessage",commentTextArea:"#questionCommentText",warningNewCommentLbl:"#warningNewComment",userNameSurname:"#UserNameSurname",lessonId:"#lessonId"},r={GetQuestionPostUrl:"",QuestionAnswer:""},i={finishExam:function(){var i=n(t.examId).val(),u=new Date(n.cookie("examCookieTimeTestId_"+i)).getTime(),f=moment.utc().format("MM/DD/YYYY HH:mm:ss"),e=new Date(f).getTime(),r=e-u,o=Math.floor(r%864e5/36e5),s=Math.floor(r%36e5/6e4),h=Math.ceil(r%6e4/1e3);n.post("/UserSaveTest/ExamFinish",{examId:i,hour:o,minute:s,second:h}).done(function(t){t.success?(n.cookie("examId_"+i,null),window.location=t.returnUrl):modalShow("Finish Exam failed")})},finishTest:function(){var i=n(t.examId).val();n.post("/UserSaveTest/TestFinish",{testId:i}).done(function(t){n("#delete").modal("hide");t.success?window.location=t.returnUrl:modalShow("Finish Test failed")})},markQuestionPinSave:function(){var u=Number(n("#questionId").val()),i=Number(n("#activeQuestionId").html()),f=n("#lessonId").val(),e=n(t.examId).val(),r=n(this).attr("data-insert-value");n.post("/Test/MarkQuestion",{questionId:u,lessonId:f,examId:e,markQuestion:r}).done(function(t){t.success==!0&&(r=="false"?(n("#markQuestionPin").attr("data-insert-value","true"),n("#markQuestionImage").removeClass("pushpin"),n("#markQuestionImage").addClass("pushpinActive"),n(".questionList li img[data-paging='"+i+"']").removeClass("dspln")):(n("#markQuestionPin").attr("data-insert-value","false"),n("#markQuestionImage").removeClass("pushpinActive"),n("#markQuestionImage").addClass("pushpin"),n(".questionList li img[data-paging='"+i+"']").addClass("dspln")))})},questionNoteSave:function(){var r=Number(n("#questionId").val()),i=n("#questioNoteText").val(),u=n("#questionNoteId").val(),f=n("#lessonId").val(),e=n(t.examId).val();n("#saveNoteInfo").html("");n.post("/Test/UpdateQuestionNote",{questionId:r,lessonId:f,examId:e,questionNote:i,questionNoteId:u}).done(function(t){t.success==!0&&i!=""?n("#saveNoteInfo").html("Your Note has been saved!"):t.success==!0&&i==""?n("#saveNoteInfo").html("Your Note has been deleted!"):n("#saveNoteInfo").html("Your Note has been failed")}).error(function(n){(n.status=="401"||n.status=="403")&&(window.location="/login");modalShow("An unexpected error has occurred.")})},nextQuestionClick:function(){var u,e;if(1){if(u=Number(n("#activeQuestionId").html()),i.paginationIndexChange(u+1,!1),e=Number(n("#totalQuestionCount").val()),e==undefined||Number(u+1)>Number(e))return!1;var f=n(".questionList li[data-paging='"+(u+1)+"']"),s=f.attr("data-value"),o=!1;(f.hasClass("false")||f.hasClass("true")||f.hasClass("examAnswer"))&&(o=!0);n("#activeQuestionId").html(u+1);n(".questionItem").removeClass("active");var h=n(t.examId).val(),c=n("#demoAnswer").val(),l=n("#isAnswered").val(),a=n("#isLmsExam").val(),v=n("#isExam").val()=="1",y=n("#examAnswerSeen").val()=="true",p=n("#randomizeOption").val();n.post(r.GetQuestionPostUrl,{questionId:s,examId:h,demoAnswer:c,isAnswered:l,isLmsExam:a,isExam:v,examAnswerSeen:y,randomizeOption:p,questionHasAnswer:o}).done(function(t){t.success==!0?(n("#questionNumber").html("No:"+t.questionNumber),n("#questionContent").html(t.data),n(".questionList li[data-paging='"+(u+1)+"']").addClass("active"),Number(t.markQuestionId)>0?(n("#markQuestionImage").removeClass("pushpin"),n("#markQuestionImage").addClass("pushpinActive"),n("#markQuestionPin").attr("data-insert-value","true")):(n("#markQuestionImage").addClass("pushpin"),n("#markQuestionImage").removeClass("pushpinActive"),n("#markQuestionPin").attr("data-insert-value","false"))):t.redirect!=""?window.location.href="/login":modalShow("An unexpected error has occurred. Please try again later.")})}return!1},backQuestionClick:function(){var u=Number(n("#activeQuestionId").html());i.paginationIndexChange(u-1,!0);console.log("questionIndex :"+u);var f=n(".questionList li[data-paging='"+(u-1)+"']"),o=f.attr("data-value"),e=!1;if((f.hasClass("false")||f.hasClass("true")||f.hasClass("examAnswer"))&&(e=!0),Number(u-1)==0)return!1;n("#activeQuestionId").html(u-1);n(".questionItem").removeClass("active");var s=n(t.examId).val(),h=n("#demoAnswer").val(),c=n("#isAnswered").val(),l=n("#isLmsExam").val(),a=n("#isExam").val()=="1",v=n("#examAnswerSeen").val()=="true",y=n("#randomizeOption").val();return n.post(r.GetQuestionPostUrl,{questionId:o,examId:s,demoAnswer:h,isAnswered:c,isLmsExam:l,isExam:a,examAnswerSeen:v,randomizeOption:y,questionHasAnswer:e}).done(function(t){t.success==!0?(n("#questionNumber").html("No:"+t.questionNumber),n(".questionList li[data-paging='"+(u-1)+"']").addClass("active"),n("#questionContent").html(t.data),Number(t.markQuestionId)>0?(n("#markQuestionImage").removeClass("pushpin"),n("#markQuestionImage").addClass("pushpinActive"),n("#markQuestionPin").attr("data-insert-value","true")):(n("#markQuestionImage").addClass("pushpin"),n("#markQuestionImage").removeClass("pushpinActive"),n("#markQuestionPin").attr("data-insert-value","false"))):t.redirect!=""?window.location.href="/login":modalShow("An unexpected error has occurred. Please try again later.")}),!1},selectQuestionItem:function(){var f=n(this).attr("data-value"),u=!1,i;(n(this).hasClass("false")||n(this).hasClass("true")||n(this).hasClass("examAnswer"))&&(u=!0);i=n(this).attr("data-paging");n("#activeQuestionId").html(i);n(".questionItem").removeClass("active");n(".questionList li[data-paging='"+i+"']").addClass("active");var e=n(t.examId).val(),o=n("#demoAnswer").val(),s=n("#isAnswered").val(),h=n("#isLmsExam").val(),c=n("#isExam").val()=="1",l=n("#randomizeOption").val(),a=n("#examAnswerSeen").val()=="true";return n.post(r.GetQuestionPostUrl,{QuestionId:f,ExamId:e,DemoAnswer:o,IsAnswered:s,IsLmsExam:h,IsExam:c,examAnswerSeen:a,randomizeOption:l,questionHasAnswer:u}).done(function(t){t.success==!0?(n("#questionNumber").html("No:"+t.questionNumber),n("#questionContent").html(t.data),Number(t.markQuestionId)>0?(n("#markQuestionImage").removeClass("pushpin"),n("#markQuestionImage").addClass("pushpinActive"),n("#markQuestionPin").attr("data-insert-value","true")):(n("#markQuestionImage").addClass("pushpin"),n("#markQuestionImage").removeClass("pushpinActive"),n("#markQuestionPin").attr("data-insert-value","false"))):t.redirect!=""?window.location.href="/login":modalShow("An unexpected error has occurred. Please try again later.")}),!1},answerQuestion:function(){var l=n(".questionOptionList li").attr("data-status");if(l=="0")return n(".questionOptionList li").click(!1),n(t.questionOptionItemLink).click(!1),!1;var e=n("#questionId").val(),u=Number(n("#activeQuestionId").html()),a=n("#lessonId").val(),o=n(this).attr("data-option"),f=n(this),v=n(t.examId).val(),y=n("#demoAnswer").val(),s=n("#isExam").val()=="1",h=n("#isNextQuestionAuto").val(),c=n("#examAnswerSeen").val()=="true",p=n("#randomizeOption").val();return n.post(r.QuestionAnswer,{questionId:e,lessonId:a,examId:v,answer:o,demoAnswer:y,isExam:s,examAnswerSeen:c,randomizeOption:p}).done(function(r){r.success?(Number(r.markQuestionId)>0?(n("#markQuestionImage").removeClass("pushpin"),n("#markQuestionImage").addClass("pushpinActive")):(n("#markQuestionImage").addClass("pushpin"),n("#markQuestionImage").removeClass("pushpinActive")),n("#demoAnswer").val(r.demoAnswer),n(".questionOptionList li").click(!1),n(t.questionOptionItemLink).click(!1),n(".questionOptionList li").addClass("cursor"),n(t.questionOptionItemLink).addClass("cursor"),n(".questionList li a[data-value='"+e+"']").addClass("questionWhite"),s&&c==!1?(n("#questionId").val(r.data.Id),n(".questionList li[data-paging='"+u+"']").addClass("examAnswer"),i.nextQuestionClick(),n(t.questionOptionItemLink).addClass("opacity"),n(f).children("div").addClass("opacity")):r.answer==!0?(n("#questionId").val(r.data.Id),n(".questionList li[data-paging='"+u+"']").addClass("true"),n(t.questionOptionItemLink).addClass("opacity"),n(f).children("div").addClass("opacity"),n(".questionOptionList li[data-option='"+r.data.TrueOption+"']").removeClass("opacity"),n(".questionOptionList li[data-option='"+r.data.TrueOption+"']").addClass("answerColorTrue"),(h==""||h=="true")&&i.nextQuestionClick()):(n(".questionList li[data-paging='"+u+"']").addClass("false"),n(f).addClass("answerColorFalse"),n(".questionOptionList li[data-option='"+r.data.TrueOption+"']").addClass("answerColorTrue"),n(".questionOptionList li").children("a").addClass("opacity"),n(".questionOptionList li[data-option='"+r.data.TrueOption+"']").find("a").removeClass("opacity"),n(".questionOptionList li[data-option='"+o+"']").find("a").removeClass("opacity"),n(".questionOptionList li[data-option='"+r.data.TrueOption+"']").find("div").addClass("answerColorTrue"))):r.redirect!=""?window.location.href="/login":modalShow("An unexpected error has occurred")}),!1},insertApproveRealExam:function(){var r=Number(n(this).attr("id")),u=n(this).attr("datacountryId"),e=Number(n(this).attr("dataid")),f=n(this),i=n(".realCount"+r+""+u),t=Number(i.text());e>0&&n("#realChecked"+r+""+u).addClass("dspln");n.post("/Test/InsertApproveRealExam",{questionId:r,countryId:u,id:e}).done(function(e){e.success==!0&&(e.resultCode==0||e.resultCode==1)?Number(e.id)>0?(f.attr("dataid",e.id),n("#realChecked"+r+""+u).removeClass("dspln"),i.html(t+1)):(t>0&&i.html(t-1),f.attr("dataid",0)):e.success==!1?(modalShow("An unexpected error has occurred."),t>0&&i.html(t-1),f.attr("dataid",0)):e.resultCode==2&&(modalShow("You have already marked this question as appeared on exam!"),t>0&&i.html(t-1),f.attr("dataid",0))})},getPagerIndex:function(n){return n<101&&(n=1),n>100&&n<201&&(n=2),n>200&&n<301&&(n=3),n>300&&n<401&&(n=4),n>400&&n<501&&(n=5),n>500&&n<601&&(n=6),n>600&&n<701&&(n=7),n>700&&n<801&&(n=8),n>800&&n<901&&(n=9),n>900&&n<1001&&(n=10),n>1e3&&n<1101&&(n=11),n>1100&&n<1201&&(n=12),n>1200&&n<1301&&(n=13),n>1300&&n<1401&&(n=14),n>1400&&n<1501&&(n=15),n>1500&&n<1601&&(n=16),n>1600&&n<1701&&(n=17),n>1700&&n<1801&&(n=18),n>1800&&n<1901&&(n=19),n>1900&&n<2001&&(n=20),n>2e3&&n<2101&&(n=21),n>2100&&n<2201&&(n=22),n>2200&&n<2301&&(n=23),n>2300&&n<2401&&(n=24),n>2400&&n<2501&&(n=25),n>2500&&n<2601&&(n=26),n>2600&&n<2701&&(n=27),n},paginationDefaultSelected:function(){var t,u,r,f;n('[data-toggle="tooltip"]').tooltip();t=n("#selectEmptyQuestionId").val();t==0&&(t=1);u=i.getPagerIndex(Number(n("#selectPagerIndex").val()));n("#pagination").twbsPagination("show",u);r="0";f=setInterval(function(){return r=="1"?(clearInterval(f),!1):(n(".questionList li[data-paging='"+t+"']").click(),r="1",!1)},1)},paginationIndexChange:function(t,r){var u=i.getPagerIndex(t);(u==1&&r||u>1)&&n("#pagination").twbsPagination("show",u)},finishExamModal:function(){var t=!0;n("#questionList li").each(function(){return console.log(n(this).hasClass("false")),n(this).hasClass("false")==!1&&n(this).hasClass("true")==!1&&n(this).hasClass("examAnswer")==!1?(t=!1,!1):void 0});t?(n(".examFinishMessage").html("Are you sure to finish the exam?"),n("#saveExam").removeClass("dspln")):(n(".examFinishMessage").html("You have to answer all questions to finish the test"),n("#saveExam").addClass("dspln"))},cancelExamDelete:function(){var i=n(t.examId).val();return n.post("/UserSaveTest/DeleteLessonTest",{examId:i}).done(function(t){n("#delete").modal("hide");t.success?window.location.href="/dashboard":modalShow("Exam delete failed !")}),!0},getCommentList:function(){var i=Number(n("#questionCommentCount").val()),r=n("#UserComments").html().length,t;i>0&&r==0&&(t=Number(n("#questionId").val()),n.post("/Test/GetCommentList",{questionId:t,pageIndex:1}).done(function(t){t.success===!0?n("#UserComments").html(t.data):t.redirect!=""?window.location.href="/login":modalShow("An unexpected error has occurred. Please try again later.")}));n("#commentContainer").removeClass("dspln")},getNextCommentList:function(){var t=Number(n(this).attr("data-pageid")),i=Number(n("#questionId").val());n.post("/Test/GetCommentList",{questionId:i,pageIndex:t}).done(function(t){t.success===!0?n("#UserComments").append(t.data):t.success==!1?n("#UserComments").append('<p class="text-center">There is No Another Comment<\/p>'):t.redirect!=""?window.location.href="/login":modalShow("An unexpected error has occurred. Please try again later.")});n("#commentContainer").removeClass("dspln")},LikeComment:function(){var u=Number(n(t.questionId).val()),u=Number(n(t.questionId).val()),i=Number(n(this).data("id")),r=n(this).data("type");r!=undefined&&n.post("/Test/SetCommentLikeOrUnlike",{questionId:u,commentId:i,commentLikeType:r}).done(function(t){if(t.success==!0){var f=Number(n(".like"+i).html()),u=Number(n(".unlike"+i).html());t.resultCode==1?r==!0?n(".like"+i).html(f+1):n(".unlike"+i).html(u+1):t.resultCode==2?(f=f>0?f-1:f,n(".like"+i).html(f),n(".unlike"+i).html(u+1)):t.resultCode==3?(u=u>0?u-1:u,n(".like"+i).html(f+1),n(".unlike"+i).html(u)):t.resultCode==4&&(u=u>0?u-1:u,n(".unlike"+i).html(u))}else t.success==!1?r?modalShow("You already like this comment"):modalShow("You don't like this comment before"):t.success==!1&&t.redirect!=undefined&&t.redirect!=""?window.location.href=t.redirect:modalShow("An unexpected error has occurred. Please try again later.")})},complainSave:function(){var i=n(t.complainMessage),r=!1,u=n("#complainTypeList").val();Number(u)!=0&&(r=!0,i=n("#complainTypeList option:selected").text());Number(u)==0&&n(t.complainMessage).val().length>1&&n(t.complainMessage).val().length<500&&(i=n(t.complainMessage).val(),r=!0);r===!0?n.post("/Test/ComplainSave",{questionId:Number(n(t.questionId).val()),commentId:Number(n(t.commentId).val()),complainText:i}).done(function(i){n("#warningComment").text("");i.success===!0?(n(t.complainMessage).val(""),n("#ToComplainCommentModal").modal("hide"),modalShow("It has been sent successfully!")):i.success===!1?n("#warningComment").text("An unexpected error has occurred. Please try again later."):i.redirect!=""?window.location.href=i.redirect:modalShow("An unexpected error has occurred. Please try again later.")}):(n("#warningComment").removeClass("dspln"),n("#warningComment").text("Empty field is not allowed!"))},insertQuestionComment:function(){var i=n(t.commentTextArea).val(),r=n(t.questionId).val(),u=Number(n("#questionNumber").html().replace("No:","")),f=Number(n(t.lessonId).val());i.length>1&&i.length<750?n.ajax({type:"POST",url:"/Test/InsertQuestionComment",data:{QuestionId:Number(r),CommentText:i,LessonId:f,QuestionNumber:u},success:function(i){if(i.success===!0){var r=i.nameSurname,u=n(t.commentTextArea).val();n("#UserComments").append('<div class="row-fluid mt bg-white specialmp" id="comment-'+i.commentId+'"><i class="fa fa-user"><\/i><span><strong>'+r+'<\/strong><\/span><span class="pl15 fs13">'+i.addDate+'<\/span><div class="splitLine"><\/div><p>'+u+'<\/p><div class="text-right"><span><i class="glyphicon glyphicon-thumbs-up"><\/i><span id="LikeCount">0<\/span><\/span><span class="ml10"><i class="glyphicon glyphicon-thumbs-down"><\/i><span id="UnLikeCount">0<\/span><\/span><span class="deleteIcon ml10"><i class="glyphicon glyphicon glyphicon-trash" id="deleteMyComment" data-id="'+i.commentId+'"><\/i><\/span><\/div><\/div>');n(t.commentTextArea).val("");n(t.warningNewCommentLbl).addClass("dspln")}else i.success==!1&&i.redirect!=undefined&&i.redirect!=""?window.location.href=i.redirect:modalShow("An unexpected error has occurred.")},error:function(){modalShow("An unexpected error has occurred.")}}):i<2?modalShow("Please type your comment! Empty field is not allowed!"):modalShow("You have typed too much characters for the comment! Max 750 characters are allowed!")},showDeleteCommentModal:function(){n("#deleteMyCommentModal").modal("show");var i=Number(n(this).data("id"));n(t.yesDeleteCommentBtn).attr("data-id",i);n("#warningDeleteComment").addClass("dspln")},deleteThisComment:function(){var i=Number(n("#yesDeleteComment").attr("data-id"));n.post("/Test/DeleteQuestionComment",{commentId:i}).done(function(r){if(r.success===!0){n("#UserComments #comment-"+i).remove();n(t.deleteCommentModal).modal("hide");var u=n("#TotalCommentCount"),f=Number(u.html());f-1>0?u.text(f-1):n("#commentList").find("b").empty();modalShow("Your comment has been deleted!")}else r.success==!1&&(r.redirect==undefined||r.redirect=="")?modalShow("Your comment has not been deleted! Please try again later."):r.redirect!=undefined&&r.redirect!=""?window.location.href="/login":modalShow("An unexpected error has occurred. Please try again later.")})},checkComplainListChange:function(){Number(n(this).val())==0?n(t.complainMessage).removeClass("dspln"):(n(t.complainMessage).addClass("dspln"),n("#warningComment").addClass("dspln"))},complainCommentIdSetter:function(){var i=n(this).data("id");n(t.commentId).val(i);n("#ToComplainCommentModal").modal("show")}};n(document).ready(function(){function f(){n("#questioNoteText").addClass("activeText")}function e(){n("#questioNoteText").removeClass("activeText")}n(document).on("click",t.backQuestion,{},i.backQuestionClick);n(document).on("click",t.nextQuestion,{},i.nextQuestionClick);n(document).on("click",t.selectQuestionItem,{},i.selectQuestionItem);n(document).on("click",t.answerQuestion,{},i.answerQuestion);n(document).on("click",t.questionNoteSave,{},i.questionNoteSave);n(document).on("click",t.markQuestionPinSave,{},i.markQuestionPinSave);n(document).on("click",t.finishTest,{},i.finishTest);n(document).on("click",t.finishExam,{},i.finishExam);n(document).on("click",t.approveRealExam,{},i.insertApproveRealExam);n(document).on("click",t.cancelExamOk,{},i.cancelExamDelete);n(document).on("click",t.finishExamModal,{},i.finishExamModal);n(document).on("click",t.commentList,{},i.getCommentList);n(document).on("click",t.likeBtn,{},i.LikeComment);n(document).on("click",t.unlikeBtn,{},i.LikeComment);n(document).on("click",t.complaintBtn,{},i.complainSave);n(document).on("click",t.insertNewCommentBtn,{},i.insertQuestionComment);n(document).on("click",t.deleteCommentBtn,{},i.showDeleteCommentModal);n(document).on("click",t.yesDeleteCommentBtn,{},i.deleteThisComment);n(document).on("click",t.complainTypeList,{},i.checkComplainListChange);n(document).on("click",t.complainCommentIdSetter,{},i.complainCommentIdSetter);n(document).on("click",t.getNextCommentsBtn,{},i.getNextCommentList);n("#isDemoPage").val()=="0"?(r.GetQuestionPostUrl="/DemoTest/GetQuestion",r.QuestionAnswer="/DemoTest/SaveAnswer"):(r.GetQuestionPostUrl="/Test/GetQuestion",r.QuestionAnswer="/Test/SaveAnswer");n("#isDemoPage").val()!=="0"&&i.paginationDefaultSelected();var u=document.getElementById("questionContent");u.addEventListener("focusin",f);u.addEventListener("focusout",e);n(document).on("keydown",function(t){n("#questioNoteText").hasClass("activeText")==!1&&(t.which==37?i.backQuestionClick():t.which==39?i.nextQuestionClick():t.which==65?n(".questionOptionList li").eq(0).click():t.which==66?n(".questionOptionList li").eq(1).click():t.which==67?n(".questionOptionList li").eq(2).click():t.which==68?n(".questionOptionList li").eq(3).click():t.which==97||t.which==49?n(".questionTabs li").eq(0).find("a").click():t.which==98||t.which==50?n(".questionTabs li").eq(1).find("a").click():t.which==99||t.which==51?n(".questionTabs li").eq(2).find("a").click():t.which==100||t.which==52?n(".questionTabs li").eq(3).find("a").click():(t.which==101||t.which==53)&&n(".questionTabs li").eq(4).find("a").click())})})})(jQuery)