<?php

/**
 * Statistics controller
 */
class StatisticsController extends BaseController {

    /**
     * Show statistics overview
     * 
     * @return View
     */
    public function overview()
    {
        return View::make('statistics/overview');
    }

    /**
     * Get main statistics
     * 
     * @return json
     */
    public function getStatistics()
    {
        $response['incomes'] = array(array('Tablet', 'Income'));
        $response['expenses'] = array(array('Tablet', 'Expense'));
        $response['savings'] = array(array('Tablet', 'Savings'));

        $tablets = $this->_getCurrentUser()->tablets;

        foreach ($tablets as $tablet) {
            if ($tablet->is_active === 1) {
                continue;
            } 
            $response['incomes'][] = array($tablet->name, (int) $tablet->total_amount);
            $response['expenses'][] = array($tablet->name, (int) $tablet->total_expenses);
            $response['savings'][] = array($tablet->name, (int) $tablet->economies);
        }

        return Response::json($response);
    }

}
