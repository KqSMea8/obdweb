import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import { Button, Row, Col, Card } from 'antd';
import Result from '@/components/Result';

import styles from './Upload.less';

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 20,
      }}
    >
      <FormattedMessage id="app.result.success.operate-title" defaultMessage="Project Name" />
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          <FormattedMessage id="app.result.success.operate-id" defaultMessage="Project ID：" />
        </span>
        23421
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          <FormattedMessage id="app.result.success.principal" defaultMessage="Principal：" />
        </span>
        <FormattedMessage id="app.result.success.step1-operator" defaultMessage="Qu Lili" />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          <FormattedMessage
            id="app.result.success.operate-time"
            defaultMessage="Effective time："
          />
        </span>
        2016-12-12 ~ 2017-12-12
      </Col>
    </Row>
  </Fragment>
);

const actions = (
  <Fragment>
    <Button type="primary">
      <FormattedMessage id="app.result.success.btn-return" defaultMessage="Back to list" />
    </Button>
    <Button>
      <FormattedMessage id="app.result.success.btn-project" defaultMessage="View project" />
    </Button>
    <Button>
      <FormattedMessage id="app.result.success.btn-print" defaultMessage="Print" />
    </Button>
  </Fragment>
);

@connect(({ equip, loading }) => ({
  equipAnalysisInfo: equip.equipAnalysisInfo,
  loading: loading.models.equip,
}))
class UploadThree extends PureComponent {
  componentDidMount() {
    //
    // const { dispatch, stepVal } = this.props;
    // dispatch({
    //   type: 'equip/reqCommon',
    //   service: 'equipAnalysis',
    //   payload: stepVal,
    //   callback: () => {
    //     console.log(stepVal);
    //   },
    // });
  }

  render() {
    const { stepVal } = this.props;
    console.log(stepVal);
    return (
      <div className={styles.stepThreeCss}>
        <Card bordered={false}>
          <Result
            type="success"
            title="导入成功"
            description="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。"
            extra={extra}
            actions={actions}
            style={{ marginTop: 48, marginBottom: 16 }}
          />
        </Card>
      </div>
    );
  }
}

export default UploadThree;