import * as React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// Google Material-UI/core
import { makeStyles } from "@mui/styles";
import { Icon } from "@mui/material";

// Google Material-UI/icons
import {
    ArrowUpward,
    AccessTime,
    Accessibility,
    BugReport,
    Code,
    Cloud,
    DateRange,
    LocalOffer,
    Store,
    Warning,
    Update,
} from "@mui/icons-material";

// core components
import Button from "components/m-d-r/CustomButtons/Button.jsx";
import GridItem from "components/m-d-r/Grid/GridItem.jsx";
import GridContainer from "components/m-d-r/Grid/GridContainer.jsx";
import Table from "components/m-d-r/Table/Table.jsx";
import Tasks from "components/m-d-r/Tasks/Tasks.jsx";
import CustomTabs from "components/m-d-r/CustomTabs/CustomTabs.jsx";
import Danger from "components/m-d-r/Typography/Danger.jsx";
import Card from "components/m-d-r/Card/Card.jsx";
import CardHeader from "components/m-d-r/Card/CardHeader.jsx";
import CardAvatar from "components/m-d-r/Card/CardAvatar.jsx";
import CardIcon from "components/m-d-r/Card/CardIcon.jsx";
import CardBody from "components/m-d-r/Card/CardBody.jsx";
import CardFooter from "components/m-d-r/Card/CardFooter.jsx";
import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.jsx";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/m-d-r/views/rtlStyle.js";

import avatar from "assets/img/faces/marc.jpg";

let bugs = [
    "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن؟",
    "	نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند؟",
    "همان حال کار آنها به نوعی وابسته به متن می‌باشد",
    "	آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند"
];
let website = [
    "بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته",
    "اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید؟"
];
let server = [
    "گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی؟",
    "از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی ؟",
    "از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند؟"
];

const useStyles = makeStyles(styles);


export default function RTLPage() {

    const classes = useStyles();

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>فضا مصرف شده</p>
                            <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Danger>
                                    <Warning />
                                </Danger>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                  فضای بیشتری داشته باشید...
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Store />
                            </CardIcon>
                            <p className={classes.cardCategory}>سود</p>
                            <h3 className={classes.cardTitle}>$34,245</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <DateRange />
                ۲۴ ساعت اخیر
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Icon>info_outline</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>مشکلات حل شده</p>
                            <h3 className={classes.cardTitle}>75</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <LocalOffer />
                توسط گیت‌هاب
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <Accessibility />
                            </CardIcon>
                            <p className={classes.cardCategory}>دنبال‌کننده</p>
                            <h3 className={classes.cardTitle}>+245</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                هم‌اکنون
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={dailySalesChart.data}
                                type="Line"
                                options={dailySalesChart.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>فروش روزانه</h4>
                            <p className={classes.cardCategory}>
                                <span className={classes.successText}>
                                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                                </span>{" "}
                رشد در فروش امروز.
                            </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> ۴ دقیقه پیش
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>دنبال کننده‌های ایمیلی</h4>
                            <p className={classes.cardCategory}>کارایی آخرین کمپین</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> کمپین دو روز پیش ارسال شد
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={completedTasksChart.data}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>وظایف انجام شده</h4>
                            <p className={classes.cardCategory}>کارایی آخرین کمپین</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> کمپین دو روز پیش ارسال شد
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomTabs
                        title="وظایف:"
                        headerColor="primary"
                        rtlActive
                        tabs={[
                            {
                                tabName: "باگ‌ها",
                                tabIcon: BugReport,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0, 3]}
                                        tasksIndexes={[0, 1, 2, 3]}
                                        tasks={bugs}
                                        rtlActive
                                    />
                                )
                            },
                            {
                                tabName: "وبسایت",
                                tabIcon: Code,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0]}
                                        tasksIndexes={[0, 1]}
                                        tasks={website}
                                        rtlActive
                                    />
                                )
                            },
                            {
                                tabName: "سرور",
                                tabIcon: Cloud,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[1]}
                                        tasksIndexes={[0, 1, 2]}
                                        tasks={server}
                                        rtlActive
                                    />
                                )
                            }
                        ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>آمار کارکنان</h4>
                            <p className={classes.cardCategoryWhite}>
                کارکنان جدید از ۱۵ آبان ۱۳۹۶
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["کد", "نام", "حقوق", "استان"]}
                                tableData={[
                                    ["1", "احمد حسینی	", "$36,738", "مازندران"],
                                    ["2", "مینا رضایی	", "$23,789", "گلستان"],
                                    ["3", "مبینا احمدپور	", "$56,142", "تهران"],
                                    ["4", "جلال آقایی	", "$38,735", "شهرکرد"]
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>اعلان ها</h4>
                            <p className={classes.cardCategoryWhite}>
                يدويا من قبل أصدقائنا من{" "}
                                <a
                                    target="_blank"
                                    href="https://material-ui-next.com/?ref=creativetime" rel="noreferrer"
                                >
                  واجهة المستخدم المادية
                                </a>{" "}
                ونصب من قبل{" "}
                                <a
                                    target="_blank"
                                    href="https://www.creative-tim.com/?ref=mdr-rtl-page" rel="noreferrer"
                                >
                  الإبداعية تيم
                                </a>
                . يرجى التحقق من{" "}
                                <a href="#pablo" target="_blank">
                  وثائق كاملة
                                </a>
                .
                            </p>
                        </CardHeader>
                        <CardBody>
                            <SnackbarContent
                                message={
                                    'این یک اعلان است که با کلاس color="warning" ایجاد شده است.'
                                }
                                close
                                rtlActive
                                color="warning"
                            />
                            <SnackbarContent
                                message={
                                    'این یک اعلان است که با کلاس color="primary" ایجاد شده است.'
                                }
                                close
                                rtlActive
                                color="primary"
                            />
                            <SnackbarContent
                                message={"این یک اعلان با دکمه بستن و آیکن است"}
                                close
                                rtlActive
                                color="info"
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={classes.cardCategory}>مدیرعامل / مدیرفنی</h6>
                            <h4 className={classes.cardTitle}>خداداد عزیزی</h4>
                            <p className={classes.description}>
                طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن
                صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده
                می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و
                ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از
                متن‌های آزمایشی و بی‌معنی استفاده می‌کنند ...
                            </p>
                            <Button color="primary" round>
                دنبال‌کردن
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
