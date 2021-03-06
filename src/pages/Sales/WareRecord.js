import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Form, Row, Col, Button, Card, message } from 'antd';
import { FormattedMessage } from 'umi/locale';

import BizConst from '@/common/BizConst';
import AddBizForm from '@/common/AddBizForm';
import EditBizForm from '@/common/EditBizForm';
import QueryBizForm from '@/common/QueryBizForm';
import { TableListBase } from '@/common/TableLists';
import { searchForm, addForm, editForm, getColumns, queryForm } from './WareRecordForms';

import styles from './WareRecord.less';

// 页面常量
const FormItem = Form.Item;

// 底层组件
@connect(({ sales, loading }) => ({
  pageWareRecord: sales.pageWareRecord,
  wareRecordInfo: sales.wareRecordInfo,
  loading: loading.models.sales,
}))
@Form.create()
class WareRecord extends PureComponent {
  state = {
    pageQuery: {},
    queryPage: 0,
    addVisible: false,
    editVisible: false,
    editWidth: 366,
    queryVisible: false,
    queryHeight: 99,
  };

  componentDidMount() {
    this.dispatchPageList(0, {});
  }

  handleAddVisible = flag => {
    this.setState({
      addVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const formParam = { ...fields };
    //
    const { excDateMoment } = formParam;
    formParam.excDate = excDateMoment.format('YYYY-MM-DD HH:mm:ss');
    //
    const { dispatch } = this.props;
    dispatch({
      type: 'sales/reqCommon',
      service: 'addWareRecord',
      payload: formParam,
      callback: () => {
        this.dispatchPageList(0, {});
        message.success('添加成功');
        this.handleAddVisible();
      },
    });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sales/reqCommon',
      service: 'deleteWareRecord',
      payload: { id },
      callback: () => {
        this.dispatchPageList();
        message.success('删除成功');
      },
    });
  };

  handleEditVisible = (flag, id) => {
    const { dispatch } = this.props;
    if (flag) {
      dispatch({
        type: 'sales/reqCommon',
        service: 'getWareRecordInfo',
        payload: { id },
      });
    } else {
      dispatch({
        type: 'sales/clearWareRecordInfo',
        payload: {},
      });
    }
    this.setState({
      editVisible: !!flag,
    });
  };

  handleEdit = fields => {
    const formParam = { ...fields };
    //
    const { excDateMoment } = formParam;
    formParam.excDate = excDateMoment.format('YYYY-MM-DD HH:mm:ss');
    //
    const { dispatch } = this.props;
    dispatch({
      type: 'sales/reqCommon',
      service: 'editWareRecord',
      payload: formParam,
      callback: () => {
        this.dispatchPageList();
        message.success('修改成功');
        this.handleEditVisible();
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.dispatchPageList(0, fieldsValue);
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.dispatchPageList(0, {});
  };

  handlePageChange = pagination => {
    let { current } = pagination;
    current -= 1;
    const { queryPage } = this.state;
    if (current !== queryPage) {
      this.dispatchPageList(current);
    }
  };

  handleQueryVisible = flag => {
    this.setState({
      queryVisible: !!flag,
    });
  };

  handleQuery = fields => {
    const formParam = { ...fields };
    console.log('request', formParam);
    //
    const { id } = formParam;
    //
    this.dispatchPageList(0, { id });
  };

  moreBtnExc = (key, record) => {
    console.log(key, record);
  };

  dispatchPageList(page, queryParam) {
    const { dispatch } = this.props;
    let { pageQuery, queryPage } = this.state;
    if (queryParam) {
      pageQuery = queryParam;
    }
    if (page || page === 0) {
      queryPage = page;
    }
    const param = { query: pageQuery, page: queryPage, size: BizConst.pageSize };
    dispatch({
      type: 'sales/reqCommon',
      service: 'pageWareRecord',
      payload: param,
    });
    this.setState({ pageQuery, queryPage });
  }

  renderSimpleForm() {
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {searchForm(FormItem, form)}
          <Col md={6} sm={14}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="form.search" defaultMessage="No translate" />
              </Button>
              <Button style={{ margin: '0 8px' }} onClick={this.handleFormReset}>
                <FormattedMessage id="form.reset" defaultMessage="No translate" />
              </Button>
            </span>
          </Col>
          <Col md={4} sm={4} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => this.handleAddVisible(true)}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { addVisible, editVisible, editWidth, queryVisible, queryHeight } = this.state;
    const { pageWareRecord, wareRecordInfo, loading } = this.props;

    const columnMethods = {
      handleEditVisible: this.handleEditVisible,
      handleDelete: this.handleDelete,
      moreBtnExc: this.moreBtnExc,
    };
    const propsTableList = {
      ...pageWareRecord,
      loading,
      columns: getColumns(columnMethods),
    };

    const addMethods = {
      handleAdd: this.handleAdd,
      handleAddVisible: this.handleAddVisible,
      bizForm: addForm,
    };

    const editMethods = {
      handleEdit: this.handleEdit,
      handleEditVisible: this.handleEditVisible,
      bizForm: editForm,
    };

    const queryMethods = {
      handleQuery: this.handleQuery,
      handleQueryVisible: this.handleQueryVisible,
      bizForm: queryForm,
    };

    return (
      <div className={styles.testCss}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <TableListBase {...propsTableList} onChange={this.handlePageChange} />
          </div>
        </Card>
        <AddBizForm {...addMethods} addVisible={addVisible} />
        <EditBizForm
          {...editMethods}
          editVisible={editVisible}
          editWidth={editWidth}
          loading={loading}
          formValue={wareRecordInfo}
        />
        <QueryBizForm {...queryMethods} queryVisible={queryVisible} queryHeight={queryHeight} />
      </div>
    );
  }
}

export default WareRecord;
